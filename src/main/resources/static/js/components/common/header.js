"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Header = React.createClass({
	render: function() {
		return (
				<div className="header clearfix">
					<nav>
						<ul className="nav nav-pills float-right">
							<li className="nav-item"><Link to="app">Home</Link></li>
							<li className="nav-item"><Link to="monitor">Monitor</Link></li>
							<li className="nav-item"><Link to="debug">Debug</Link></li>
						</ul>
					</nav>
				
					<h3 className="text-muted">Salesforce Platform Monitoring</h3>
				</div>
				);
	}
});

module.exports = Header;