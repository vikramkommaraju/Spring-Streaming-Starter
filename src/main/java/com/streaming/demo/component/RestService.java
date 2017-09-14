package com.streaming.demo.component;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.streaming.demo.component.EventGeneratorTask.EntityType;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Service
public class RestService {

	@Autowired
	StreamConfiguration config;
	
	@Autowired
	DebugLogger logger;

	private final Client client = Client.create();
	private String accessToken;

	private String buildPostLoginUrl() {
		return config.getServerUrl() + "/services/oauth2/token?grant_type=password&client_id=" + config.getClientKey()
				+ "&client_secret=" + config.getClientSecret() + "&username=" + config.getUserName() + "&password="
				+ config.getPassword();
	}

	public String login() {
		String url = buildPostLoginUrl();
		WebResource webResource = client.resource(url);
		ClientResponse response = webResource.type("application/json").post(ClientResponse.class);
		String output = response.getEntity(String.class);
		JSONObject obj = new JSONObject(output);
		accessToken = (String) obj.get("access_token");
		return accessToken;
	}
	
	public String query(EntityType entity, int limit) {
		String accessToken = getAccessToken();
		String url = buildQueryEntityUrl(entity, limit);
		System.out.println("Query : " + url);
		WebResource webResource = client.resource(url);
		ClientResponse response = webResource.type("application/json").header("Authorization", "Bearer " + accessToken).get(ClientResponse.class);
		String output = response.getEntity(String.class);
		return output;
	}

	public void createQueryAlertCustomObject(QueryAlert__C alert) {

		String accessToken = getAccessToken();
		String url = buildPostObjectUrl();
		logger.log("URL to create custom object: url");
		String input =  "{ \"Username__c\" : \""+alert.getUserName()+"\",  \"RowsProcessed__c\" : \""+alert.getRowsProcessed()+"\", \"QueryDate__c\" : \""+alert.getQueryDate()+"\", \"QueriedEntity__c\" : \""+alert.getQueriedEntity()+"\" }";
		logger.log(input);
		WebResource webResource = client.resource(url);
		ClientResponse response = webResource.type("application/json")
				.header("Authorization", "Bearer " + accessToken)
				.post(ClientResponse.class, input);
		String output = response.getEntity(String.class);
		logger.log(output);
		logger.log("Create new custom object Success: ");
		
	}
	
	private String getAccessToken() {
		return accessToken != null ? accessToken : login();
	}
	
	private String buildPostObjectUrl() {
		return config.getServerUrl()+"/services/data/"+config.getApiVersion()+"/sobjects/QueryAlert__c";
	}
	
	private String buildQueryEntityUrl(EntityType entity, int limit) {
		String queryString = "Select+Id+From+"+entity+"+LIMIT+"+limit;
		return config.getServerUrl()+"/services/data/"+config.getApiVersion()+"/query?q="+queryString;
	}


}
