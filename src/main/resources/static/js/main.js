$ = jQuery = require('jquery');
var App = console.log('Hello world from Browserify!');
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(<h1>Hello, world From React!</h1>, document.getElementById('app'));

module.exports = App;