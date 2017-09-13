package com.streaming.demo;

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
	private ConfigurableApplicationContext ctx;
	
	@PostConstruct
	public void init() {
		try {
			empService.start(streamConsumer);
			System.out.println("Listening on topic " + config.getTopic());
		} catch (InterruptedException | ExecutionException | TimeoutException e) {
			System.out.println("Failed to subsribe to stream. Reason: " + e.getMessage());
			ctx.close();
		}
	}
	
	@PreDestroy
	public void cleanUp() {
		empService.stop();
	}
}
