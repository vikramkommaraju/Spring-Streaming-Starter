package com.streaming.demo.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	@Autowired
	StreamingMonitor streamMonitor;
	
	@Autowired
	private SimpMessagingTemplate template;

    @MessageMapping("/connect")
    @SendTo("/topic/responses")
    public SubscribeMessageResponse connect(SubscribeMessageRequest message) throws Exception {
        System.out.println("Received command " + message.getCommand());
        if("subscribe".equalsIgnoreCase(message.getCommand())) {

            if(streamMonitor.begin()) {
            		return new SubscribeMessageResponse("subscribe-success");
	        } else {
	        		return new SubscribeMessageResponse("subscribe-failed");  
	        }

        } else {
        		streamMonitor.end();
        		return new SubscribeMessageResponse("unsubscribe-success");
        }
        
    }
    
    public void sendEventNotification(QueryAlert__C alert) {
    		try {
    				String entityName = alert.getQueriedEntity();
    				int rowsProcessed = (int) alert.getRowsProcessed();
    				EventNotificationMessage message = new EventNotificationMessage(entityName, rowsProcessed);
				template.convertAndSend("/topic/responses", message);
			} catch (Exception e) {
				System.out.println("Failed to send notification");
			}
    }

}
