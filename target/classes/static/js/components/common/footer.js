"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Footer = React.createClass({
	render: function() {
		return (
				<div>
				  <br />
			      <br />
			      <br />
				 <footer className="footer">
			        <p>&copy; Salesforce 2017</p>
			      </footer>
				</div>
				);
	}
});

module.exports = Footer;