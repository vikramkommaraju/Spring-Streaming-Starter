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
			System.out.println("Open stream...");
			empService.stop();
			Thread.sleep(1000);
			empService.start(streamConsumer);
			System.out.println("Successfully started stream");
		} catch (Exception e) {
			result = false;
			System.out.println("Failed to open stream for config [ " + config + "Reason: " + e.getMessage());
			e.printStackTrace();
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
