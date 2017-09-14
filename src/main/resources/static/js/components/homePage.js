"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Home = React.createClass({
	 
	render: function(){
		return (
				<div>
					<div className="jumbotron">
				        <h1 className="display-3">Event Streaming Demo</h1>
				        <p className="lead">This demo application uses Salesforce Streaming API to monitor data leakage using API events!</p>
				        <Link to="monitor"><button className="btn btn-lg btn-primary" role="button">Get Started</button></Link>
			        </div>
					<div className="row marketing">
			        		<div className="row">
					        <div className="col-md-4">
					          <h2>Real Time Monitoring</h2>
					          <p>Monitor event streams and get notified in real time. With Event Streaming you can make sure you dont miss any suspicious user activity.</p>
					        </div>
					        <div className="col-md-4">
					          <h2>Transaction Security</h2>
					          <p>Secure your org by creating real time security policies to prevent anomalous behavior.</p>
					       </div>
					        <div className="col-md-4">
					          <h2>Storage</h2>
					          <p>Track a history of user activity using Salesforce SOQL and ASync SOQL API</p>
					        </div>
					     </div>
					</div>
				</div>
		);
	}
});

module.exports = Home;