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
			empService.stop();
			Thread.sleep(1000);
			empService.start(streamConsumer);
		} catch (InterruptedException | ExecutionException | TimeoutException e) {
			result = false;
		}
		return result;
	}
	
	public void end() {
		empService.stop();
	}
	
	@PreDestroy
	public void close() {
		end();
	}
}
