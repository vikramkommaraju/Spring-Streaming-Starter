package com.streaming.demo.component;

import static com.salesforce.emp.connector.LoginHelper.login;

import java.net.URL;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.Consumer;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;

import com.salesforce.emp.connector.BayeuxParameters;
import com.salesforce.emp.connector.EmpConnector;
import com.salesforce.emp.connector.TopicSubscription;

@Service
public class EMPServiceConnector {

	@Autowired
	StreamConfiguration config;
	
	@Autowired
	private ConfigurableApplicationContext ctx;
	
	@Autowired
	DebugLogger logger;
	
	private BayeuxParameters params;
	private EmpConnector connector;
	private Future<TopicSubscription> topic;
	
	public boolean start(Consumer<Map<String, Object>> streamConsumer) {	
		boolean result = true;
		try {
			if(params == null) {
				System.out.println("Logging into org using " + config.getUserName());
				params = login(new URL(config.getServerUrl()), config.getUserName(), config.getPassword());
				System.out.println("Login success.");
				connector = new EmpConnector(params);
			}
			
			if(connector != null) {
				connector.start().get(5, TimeUnit.SECONDS);
		        topic = connector.subscribe(config.getTopic(), -1L, streamConsumer);
		        topic.get(5, TimeUnit.SECONDS);				
			}
	        
		} catch (Exception e) {
			logger.log("Failed to login to the org! " + e.getMessage());
			result=false;
		}	
		
		return result;
		
	}
	
	public void stop() {
		
		if(connector != null) {
			connector.stop();			
		}
	}
}

