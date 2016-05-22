"use strict";

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var size = require('gulp-size');
var config = require('./config');
var del = require('del');

gulp.task('images', function() {
    del.sync([config.dest.images]);

    return gulp.src(config.src.images + '/**/*.{jpg,jpeg,png,gif,svg}')

        .pipe(gulp.dest(config.dest.images))
        .pipe(size({
            title: 'images'
        }));
});

gulp.task('images:watch', function() {
    gulp.watch(config.src.images + '/**/*', ['images']);
});
