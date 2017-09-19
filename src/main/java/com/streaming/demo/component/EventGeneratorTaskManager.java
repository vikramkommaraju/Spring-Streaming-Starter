package com.streaming.demo.component;

import java.util.concurrent.ScheduledFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
public class EventGeneratorTaskManager {

	@Autowired
	TaskScheduler taskScheduler;
	
	@Autowired
	EventGeneratorTask generatorTask;
	
	ScheduledFuture<?> future;
	
	public void startGeneratorTask() {
		future = taskScheduler.scheduleWithFixedDelay(generatorTask, 500);	
	}
	
	public void stopGeneratorTask() {
		future.cancel(true);
	}
	
	
	@Bean
	public ThreadPoolTaskScheduler threadPoolTaskScheduler(){
		ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
		threadPoolTaskScheduler.setPoolSize(1);
		threadPoolTaskScheduler.setThreadNamePrefix("EventGeneratorTaskScheduler");
		return threadPoolTaskScheduler;
	}
}
