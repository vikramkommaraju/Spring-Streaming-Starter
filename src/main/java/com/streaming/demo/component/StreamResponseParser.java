package com.streaming.demo.component;

import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.streaming.demo.component.QueryAlert__C.QueryAlertBuilder;

@Service
public class StreamResponseParser {
	
	private Gson gson = new Gson(); 
	
	public JsonObject jsonify(Map<String, Object> message) {
		Object payload = message.get("payload");
		String json = gson.toJson(payload);
		return gson.fromJson(json, JsonObject.class);
	}
	
	public boolean isAccountEntityQueried(JsonObject jsonResponse) {
		return getQueriedEntity(jsonResponse) != null ? getQueriedEntity(jsonResponse).contains("Account") : false;
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
		return userName != null ? userName.getAsString() : null;
	}
	
	private double getRowsProcessed(JsonObject jsonResponse) {
		JsonElement rowsProcessed = jsonResponse.get("RowsProcessed");
		return rowsProcessed != null ? Double.parseDouble(rowsProcessed.getAsString()) : 0.0;
	}
	
	private String getQueriedEntity(JsonObject jsonResponse) {
		JsonElement queriedEntities = jsonResponse.get("QueriedEntities");
		return queriedEntities != null ? queriedEntities.getAsString() : null;
	}	
	
}
