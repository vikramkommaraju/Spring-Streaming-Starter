package com.streaming.demo.component;

import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.gson.JsonObject;
import com.streaming.demo.component.QueryAlert__C.QueryAlertBuilder;

@Scope(value = "singleton")
@Component
public class StreamConsumer implements Consumer<Map<String, Object>> {

	@Autowired
	StreamResponseParser streamParser;
	
	@Autowired
	RestService restService;
	
	@Autowired
	DebugLogger logger;
	
	@Autowired
	WebSocketController socketController;
	
	@Override
	public void accept(Map<String, Object> message) {
		System.out.println("Received event on stream to publish " + message );
		
		JsonObject jsonResponse = streamParser.jsonify(message);
		
		QueryAlert__C alert = null;
		if(streamParser.shouldPublishEvent(jsonResponse)) {
			alert = streamParser.newAlert(jsonResponse);
			try {
				System.out.println("Send event notification");
				socketController.sendEventNotification(alert);
			} catch (Exception e) {
				System.out.println("Failed to publish event on channel. Reason: " + e.getMessage());
			}
			
			if(streamParser.isRowsExceeded(jsonResponse)) {
				restService.createQueryAlertCustomObject(alert);
			}
		} 
		
		
		
	}
	
	//@Scheduled(fixedRate = 200)
    public void generateDummyStreamOfEvents() { 
		EntityType entity = EntityType.values()[ThreadLocalRandom.current().nextInt(0, EntityType.values().length)];
		QueryAlert__C alert = QueryAlertBuilder.newBuilder().queriedEntity(entity.toString()).rowsProcessed(ThreadLocalRandom.current().nextInt(5, 50)).build();
		socketController.sendEventNotification(alert);
		
	}

	public enum EntityType {
		Account,
		Lead,
		Contact,
		Opportunity,
		Report
	}
}
