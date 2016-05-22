var gulp = require('gulp');

gulp.task('build', ['clean', 'typedoc','templates', 'fonts', 'vendor', 'scripts', 'images', 'data']);
