"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var eslint = require('gulp-eslint'); //Lint JS files including JSX



var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/main/resources/templates/**/*.html',
		js: './src/main/resources/static/js/**/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',	
		],
		mainJs: './src/main/resources/static/js/main.js',
		dist: './src/main/resources/static/dist',
	},
};

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());

});

gulp.task('js', function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());


});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));

});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
				.pipe(eslint({config: 'eslint.config.json'}))
				.pipe(eslint.format());

});

gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint'])

});

gulp.task('default', ['html', 'js', 'css']);