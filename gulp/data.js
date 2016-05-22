"use strict";

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('./config');
var del = require('del');

gulp.task('data', function() {
    del.sync([config.dest.data]);
    return gulp.src(config.src.data + '/**/*.{json,xml}')
        .pipe(gulp.dest(config.dest.data));
});

gulp.task('data:watch', function() {
    gulp.watch(config.src.data + '/**/*', ['data']);
});
