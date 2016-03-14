'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');


var paths = ['*.js', 'test/*.js'];

// Eslint Task - Making JS Consistent
gulp.task('lint', function(){
  return gulp.src(paths)
      .pipe(lint())
      .pipe(lint.format());
});

gulp.task('default', ['lint']);
 // Task for Mocha - Testing my code
gulp.task('mocha', function(){
  console.log(__dirname);
  return gulp.src('./test/persistent-test.js')
  .pipe(mocha());
});
 //Default Tasks - If only Gulp
gulp.task('default', ['lint', 'mocha'], function(){

});
 // Watch task - Automatically checks/runs tasks as I change information
gulp.task('watch', function() {
  gulp.watch(['*.js','./test/*.js'], ['default']);
});
