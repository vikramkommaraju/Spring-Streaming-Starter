package com.streaming.demo;

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
	
	@Override
	public void accept(Map<String, Object> message) {

		JsonObject jsonResponse = streamParser.jsonify(message);
		
		if(streamParser.isAccountEntityQueried(jsonResponse)) {
			System.out.println("Received API Event on Account!");
			QueryAlert__C alert = streamParser.newAlert(jsonResponse);
			restService.createQueryAlertCustomObject(alert);
		}
		
	}
	

}
