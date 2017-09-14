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
	
	public boolean begin() {
		boolean result = true;
		try {
			logger.log("Opening stream... " + config.getTopic());
			empService.start(streamConsumer);
			logger.log("Success: Listening on topic " + config.getTopic());
		} catch (InterruptedException | ExecutionException | TimeoutException e) {
			result = false;
		}
		return result;
	}
	
	public void end() {
		logger.log("Closing stream... " + config.getTopic());
		empService.stop();
		logger.log("Closed stream... " + config.getTopic());
	}
	
	@PreDestroy
	public void close() {
		end();
	}
}
