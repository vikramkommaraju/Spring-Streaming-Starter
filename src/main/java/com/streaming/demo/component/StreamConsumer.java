package com.streaming.demo.component;

import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.JsonObject;
import com.streaming.demo.component.QueryAlert__C.QueryAlertBuilder;
import com.streaming.demo.component.RestService.EntityType;

@Service
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
	
}
