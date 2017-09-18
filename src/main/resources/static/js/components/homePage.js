"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var StreamingPanel = require('./streamingPanel');
var MetricsDashboard = require('./metrics-dashboard');
var NotificationsPanel = require('./notifications-panel');

const PageHeader = (props) => {
	return (
			<div className="col-lg-12">
                <h1 className="display-3">API Events Streaming Demo</h1>
                <hr />
			</div>
		);
};


var Home = React.createClass({
	 
	render: function(){
		return (
				<div id="page-wrapper">
		            
		            
		            <div className="row">
		            	<PageHeader />
		            </div>

		            <div className="row">
		            	<MetricsDashboard />
		            </div>
		            
		            <div className="row">
		                <StreamingPanel />
		                <NotificationsPanel />
		            </div>
		        </div>
		);
	}
});

module.exports = Home;