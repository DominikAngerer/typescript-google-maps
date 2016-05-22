var config = require('./config');
var gulp = require('gulp');
var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var util = require('gulp-util');
var notify = require('gulp-notify');
var typedoc = require("gulp-typedoc");

gulp.task('scripts', function() {
    var b = browserify({
        entries:  config.src.js + '/main.ts',
        debug: true
    });
    b.plugin('tsify', {
        noImplicitAny: true,
        target: 'ES5'
    });
    return b.bundle()
        .on('error', notify.onError(function (error) {
            return error.message;
        }))
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('scripts:watch', function() {
    gulp.watch(config.src.js + '/**/*.ts', ['scripts']);
});
