package com.streaming.demo;

import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.streaming.demo.QueryAlert__C.QueryAlertBuilder;

@Service
public class StreamResponseParser {
	
	private Gson gson = new Gson(); 
	
	public JsonObject jsonify(Map<String, Object> message) {
		Object payload = message.get("payload");
		String json = gson.toJson(payload);
		return gson.fromJson(json, JsonObject.class);
	}
	
	public boolean isAccountEntityQueried(JsonObject jsonResponse) {
		return getQueriedEntity(jsonResponse).contains("Account");
	}
	
	public QueryAlert__C newAlert(JsonObject jsonResponse) {
		QueryAlertBuilder builder = QueryAlertBuilder.newBuilder();
		return builder.queriedEntity(getQueriedEntity(jsonResponse))
			   .rowsProcessed(getRowsProcessed(jsonResponse))
			   .queryDate("2017-09-12")
			   .userName(getUserName(jsonResponse))
			   .build();
	}
	
	private String getUserName(JsonObject jsonResponse) {
		JsonElement userName = jsonResponse.get("Username");
		return userName.getAsString();
	}
	
	private double getRowsProcessed(JsonObject jsonResponse) {
		JsonElement rowsProcessed = jsonResponse.get("RowsProcessed");
		return Double.parseDouble(rowsProcessed.getAsString());
	}
	
	private String getQueriedEntity(JsonObject jsonResponse) {
		JsonElement queriedEntities = jsonResponse.get("QueriedEntities");
		return queriedEntities.getAsString();
	}	
	
}
