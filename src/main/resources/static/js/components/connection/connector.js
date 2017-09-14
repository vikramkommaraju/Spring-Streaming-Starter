"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var Connection = React.createClass({
	
	
	
	
	
	sleep : function (ms) {
		  return new Promise(resolve => setTimeout(resolve, ms));
	},
	
	
//	connectToServer : function() {
//		console.log('Invoke connect!!');
//		ConnectionHandler.connect();
//		this.sleep(2000).then(() => {
//			ConnectionHandler.sendName();
//		});
//		
//	},
	
	
	render: function() {
		return (
				
		);
	}
});

module.exports = Connection;
