var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('ftp', function () {
    return gulp.src('dist/**/*')
        .pipe(sftp({
            host: '',
            user: '',
            pass: '',
            remotePath: ''
        }));
});
