package com.streaming.demo.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	@Autowired
	EventGeneratorTaskManager taskManager;
	
	@Autowired
	StreamingMonitor streamMonitor;
	
	@Autowired
	private SimpMessagingTemplate template;

    @MessageMapping("/messages")
    @SendTo("/topic/subscription")
    public WebSocketMessageResponse connect(WebSocketMessageRequest message) throws Exception {
        
    		if("subscribe".equalsIgnoreCase(message.getCommand())) {

            if(streamMonitor.begin()) {
            		return new WebSocketMessageResponse("subscribe-success");
	        } else {
	        		return new WebSocketMessageResponse("subscribe-failed");  
	        }

        } else if("unsubscribe".equalsIgnoreCase(message.getCommand())){
        		streamMonitor.end();
        		taskManager.stopGeneratorTask();
        		return new WebSocketMessageResponse("unsubscribe-success");
        		
        } else if("start".equalsIgnoreCase(message.getCommand())) {

            System.out.println("Start generating events!");
            taskManager.startGeneratorTask();
            return new WebSocketMessageResponse("started");

        } else {
        		System.out.println("Stop generating events!");
        		taskManager.stopGeneratorTask();
        		return new WebSocketMessageResponse("stopped");
        }    
        
    }
  
    public void sendEventNotification(QueryAlert__C alert) {
    		try {
    				String entityName = alert.getQueriedEntity();
    				int rowsProcessed = (int) alert.getRowsProcessed();
    				EventNotificationMessage message = new EventNotificationMessage(entityName, rowsProcessed);
    				//System.out.println("Sending message: " + message);
				template.convertAndSend("/topic/events", message);
			} catch (Exception e) {
				System.out.println("Failed to send notification");
			}
    }

}
