package com.streaming.demo.component;

import java.util.Map;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.JsonObject;

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

		JsonObject jsonResponse = streamParser.jsonify(message);
		
		QueryAlert__C alert = null;
		if(streamParser.shouldPublishEvent(jsonResponse)) {
			alert = streamParser.newAlert(jsonResponse);
			try {
				System.out.println("Publish event!");
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
