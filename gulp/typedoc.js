var config = require('./config');
var gulp = require('gulp');
var typedoc = require('gulp-typedoc');

gulp.task('typedoc', function() {
	return gulp
		.src([config.src.js+'/**/*.ts'])
		.pipe(typedoc({ 
			// TypeScript options (see typescript docs) 
			module: 'commonjs', 
			target: 'es5',
			includeDeclarations: true,
            mode: 'file',
			
			// Output options (see typedoc docs) 
			out: config.dest.docs, 
 
			// TypeDoc options (see typedoc docs) 
			name: config.project, 
			ignoreCompilerErrors: false,
			version: true,
		}))
	;
});