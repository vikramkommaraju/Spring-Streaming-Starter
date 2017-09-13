package com.streaming.demo.component;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class StreamingMonitor {

	@Autowired
	EMPServiceConnector empService;
	
	@Autowired
	StreamConsumer streamConsumer;
	
	@Autowired
	StreamConfiguration config;
	
	@Autowired
	DebugLogger logger;

	@Autowired
	private ConfigurableApplicationContext ctx;
	
	@PostConstruct
	public void init() {
		try {
			empService.start(streamConsumer);
			logger.log("Listening on topic " + config.getTopic());
		} catch (InterruptedException | ExecutionException | TimeoutException e) {
			logger.log("Failed to subsribe to stream. Reason: " + e.getMessage());
			ctx.close();
		}
	}
	
	@PreDestroy
	public void cleanUp() {
		empService.stop();
	}
}
