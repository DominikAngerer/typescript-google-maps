var gulp = require('gulp');
var config = require('./config');

gulp.task('watch',  ['icons:watch', 'templates:watch','fonts:watch', 'styles:watch', 'scripts:watch', 'images:watch', 'bower:watch', 'data:watch']);
