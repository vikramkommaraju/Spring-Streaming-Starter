package com.streaming.demo.component;

import static com.salesforce.emp.connector.LoginHelper.login;

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
	
	@PostConstruct
	public void init() {
		try {
			params = login(config.getUserName(), config.getPassword());
			connector = new EmpConnector(params);
		} catch (Exception e) {
			logger.log("Failed to login to the org! " + e.getMessage());
			ctx.close();
		}	
	}
	
	public void start(Consumer<Map<String, Object>> streamConsumer) throws InterruptedException, ExecutionException, TimeoutException {	
		connector.start().get(5, TimeUnit.SECONDS);
        topic = connector.subscribe(config.getTopic(), EmpConnector.REPLAY_FROM_TIP, streamConsumer);
        topic.get(5, TimeUnit.SECONDS);
	}
	
	public void stop() {
		connector.stop();
	}
}

