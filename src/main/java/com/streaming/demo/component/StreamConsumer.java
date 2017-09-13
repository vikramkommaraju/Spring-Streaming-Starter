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
	
	@Override
	public void accept(Map<String, Object> message) {

		JsonObject jsonResponse = streamParser.jsonify(message);
		
		if(streamParser.isAccountEntityQueried(jsonResponse)) {
			logger.log("Received API Event on Account!");
			QueryAlert__C alert = streamParser.newAlert(jsonResponse);
			restService.createQueryAlertCustomObject(alert);
		}
		
	}
	

}
