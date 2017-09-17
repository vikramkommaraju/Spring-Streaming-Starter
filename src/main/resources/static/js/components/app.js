/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.
$ = jQuery = require('jquery');
var React = require('react');
var Navbar = require('./common/nav-bar');
var HomePage = require('./homePage');

var Footer = require('./common/footer');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				<Navbar />
				<HomePage />
				
				<Footer />
			</div>
		);

		}
});

module.exports = App;