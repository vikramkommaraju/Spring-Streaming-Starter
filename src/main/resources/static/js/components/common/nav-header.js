"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NavHeader = React.createClass({

	render: function() {
		return (
				<div className="navbar-header">
		                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
		                <a className="navbar-brand"><img src="https://brandfolder.com/salesforce/logo/salesforce-primary-logo.png" height="35" width="55"/></a>
		        </div>
		);
	}
});

module.exports = NavHeader;