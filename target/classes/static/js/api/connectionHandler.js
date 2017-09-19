"use strict";
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var stompClient = null;

var ConnectionHandler = {
		
		sendMessage : function(message) {
			console.log('Sending message...');
			stompClient.send("/app/" + message, {}, '{"command" : "'+message+'"}');
		},
				
		connect : function() {
			console.log('Connecting to server...');
			var socket = new SockJS('/gs-guide-websocket');
			stompClient = Stomp.over(socket);
			
			var processResponse = function(message) {
			    console.log("Recieved message: " + message);
			};
			
		    stompClient.connect({}, function (frame) {
		        console.log('Connected: ' + frame);
		        stompClient.subscribe('/topic/greetings', function (greeting) {
		            processResponse(JSON.parse(greeting.body).content);
		        });
		       
		    });
		},
		
		disconnect : function() {
		    if (stompClient !== null) {
		        stompClient.disconnect();
		    }
		    console.log("Disconnected");
		}

};

module.exports = ConnectionHandler;
