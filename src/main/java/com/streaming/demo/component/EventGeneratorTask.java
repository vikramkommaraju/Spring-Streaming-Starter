package com.streaming.demo.component;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EventGeneratorTask {

	@Autowired
	RestService restService;
	
	@Scheduled(fixedRate = 2000)
	public void generateEvent() {
		EntityType entity = getRandomEntityType();
		int limit = ThreadLocalRandom.current().nextInt(5, 50);
		restService.query(entity, limit);
	}
	
	private EntityType getRandomEntityType() {
		int randIndex = ThreadLocalRandom.current().nextInt(0, EntityType.values().length);
		return EntityType.values()[randIndex];
	}
	
	public enum EntityType {
		Account,
		Lead,
		Contact,
		Opportunity,
		Product
	}
}
