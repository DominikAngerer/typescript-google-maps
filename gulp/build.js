var gulp = require('gulp');

gulp.task('build', ['clean', 'typedoc','templates', 'fonts', 'icons', 'vendor', 'scripts', 'images', 'data']);
