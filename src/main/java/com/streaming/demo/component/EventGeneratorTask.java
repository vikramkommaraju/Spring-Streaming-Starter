package com.streaming.demo.component;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.streaming.demo.component.QueryAlert__C.QueryAlertBuilder;
import com.streaming.demo.component.RestService.EntityType;

@Component
public class EventGeneratorTask implements Runnable {

	@Autowired
	RestService restService;
	
	@Autowired
	StreamingMonitor streamMonitor;
	
	@Autowired
	WebSocketController socketController;
	
	@Override
	public void run() {
		generateEvent();
	}
	
	public void generateEvent() {
		EntityType entity = getRandomEntityType();
		int limit = ThreadLocalRandom.current().nextInt(5, 1000);
		restService.query(entity, limit);
		
		//Temporary stream consumer logic
		if(streamMonitor.isSubscribed()) {
			
			QueryAlert__C alert = QueryAlertBuilder.newBuilder().queriedEntity(entity.toString()).rowsProcessed(ThreadLocalRandom.current().nextInt(5, 500)).queryDate("2017-09-19").build();
			socketController.sendEventNotification(alert);
			
			if(alert.getRowsProcessed() >= 400) {
				restService.createQueryAlertCustomObject(alert);
			}			
		}
	}
	
	private EntityType getRandomEntityType() {
		int randIndex = ThreadLocalRandom.current().nextInt(0, EntityType.values().length);
		return EntityType.values()[randIndex];
	}
	
}
