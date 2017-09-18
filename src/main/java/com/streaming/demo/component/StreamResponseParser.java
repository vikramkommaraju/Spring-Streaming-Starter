package com.streaming.demo.component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.streaming.demo.component.QueryAlert__C.QueryAlertBuilder;
import com.streaming.demo.component.RestService.EntityType;

@Service
public class StreamResponseParser {
	
	private Gson gson = new Gson(); 
	List<String> expectedTypes = Arrays.asList(Stream.of(EntityType.values()).map(EntityType::name).toArray(String[]::new));
	
	public JsonObject jsonify(Map<String, Object> message) {
		Object payload = message.get("payload");
		String json = gson.toJson(payload);
		return gson.fromJson(json, JsonObject.class);
	}
	
	public boolean shouldPublishEvent(JsonObject jsonResponse) {
		return isFilteredEntity(jsonResponse);
	}
	
	public boolean isFilteredEntity(JsonObject jsonResponse) {
		return getQueriedEntity(jsonResponse) != null ? expectedTypes.contains(getQueriedEntity(jsonResponse)) : false;
	}
	
	public boolean isRowsExceeded(JsonObject jsonResponse) {
		return getRowsProcessed(jsonResponse) > 40;
	}
	
	public QueryAlert__C newAlert(JsonObject jsonResponse) {
		QueryAlertBuilder builder = QueryAlertBuilder.newBuilder();
		String queriedEntity = getQueriedEntity(jsonResponse);
		return builder.queriedEntity(queriedEntity)
			   .rowsProcessed(getRowsProcessed(jsonResponse))
			   .queryDate("2017-09-12")
			   .userName(getUserName(jsonResponse))
			   .build();
	}
	
	private String getUserName(JsonObject jsonResponse) {
		JsonElement userName = jsonResponse.get("Username");
		return userName != null ? userName.getAsString() : null;
	}
	
	public double getRowsProcessed(JsonObject jsonResponse) {
		JsonElement rowsProcessed = jsonResponse.get("RowsProcessed");
		return rowsProcessed != null ? Double.parseDouble(rowsProcessed.getAsString()) : 0.0;
	}
	
	public String getQueriedEntity(JsonObject jsonResponse) {
		JsonElement queriedEntities = jsonResponse.get("QueriedEntities");
		return queriedEntities != null ? queriedEntities.getAsString() : null;
	}	
	
}
