"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var StreamingPanel = require('./streamingPanel');
var MetricsDashboard = require('./metrics-dashboard');
var NotificationsPanel = require('./notifications-panel');
var MetricCharts = require('./metric-charts');
var ConnectionService = require('./connectionService');


const GeneratorButton = (props) => {
	return (
		<p><a className={ "btn btn-lg btn-block btn-"+props.style } href="#" role="button" onClick={() => props.generateOnClick()}><span className={ props.label == 'Start' ? "glyphicon glyphicon-play" : "glyphicon glyphicon-stop" }></span> {props.label}</a></p>
	);

}


var Home = React.createClass({
	 
	getInitialState: function() {
		return {
			label: "Start",
			style: "success"		
		};

	},

	commandListener : function(response) {
		var self=this;
		var result = JSON.parse(response.body).content;
		
		if(result == 'unsubscribe-success') { 
			self.setState({label: 'Start', style: 'success'});
		}
	},

	eventGenerator : function() {
		var self = this;
		if(this.state.label == 'Start') {
			ConnectionService.connect(self.connectionCallback);
			self.setState({label: 'Stop', style: 'danger'});
		} else {
			ConnectionService.send("stop");
			self.setState({label: 'Start', style: 'success'});
		}
	}, 

	connectionCallback : function() {
		ConnectionService.send("start");
		ConnectionService.register("/topic/subscription", this.commandListener);
	},

	render: function(){
		return (
				<div id="page-wrapper">
		            
		            
		            <div className="row">
		            	<div className="col-md-3">
		            		<GeneratorButton style={this.state.style} label={this.state.label} generateOnClick={this.eventGenerator}/>
						</div>
			            <div className="col-md-9">
			                <h1 className="display-3">API Events Streaming Demo</h1>
			            </div>
		            	
			            <hr />

		            </div>

		            <div className="row">
		            	<MetricsDashboard />
		            </div>
		            
		            <div className="row">
		                <StreamingPanel />
		                <NotificationsPanel />
		            </div>
		            <div className="row">
		                <MetricCharts />
		            </div>
		        </div>
		);
	}
});

module.exports = Home;