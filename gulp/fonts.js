"use strict";

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('./config');
var del = require('del');

gulp.task('fonts', function() {
    del.sync([config.dest.fonts]);
    return gulp.src(config.src.fonts + '/**/*.{eot,svg,ttf,woff}')
        .pipe(gulp.dest(config.dest.fonts))
        .pipe(size({
            title: 'fonts'
        }));
});

gulp.task('fonts:watch', function() {
    gulp.watch(config.src.fonts + '/**/*.{eot,svg,ttf,woff}', ['fonts']);
});
