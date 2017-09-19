"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var NavHeader = require('./nav-header');
var NavSidebar = require('./nav-sidebar');

var Navbar = React.createClass({

	render: function() {
		return (
				<div>

		        <nav className="navbar navbar-default navbar-static-top" role="navigation">
		            
		            <NavHeader />
					<NavSidebar />
		        </nav>

		        
		    </div>
		);
	}
});

module.exports = Navbar;