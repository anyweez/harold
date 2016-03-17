/* jslint node: true */
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
    return gulp.src('app/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});