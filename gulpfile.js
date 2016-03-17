/* jslint node: true */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var js_obfuscator = require('gulp-js-obfuscator');

gulp.task('default', function () {
    return gulp.src('app/*.js')
        .pipe(uglify())
        .pipe(js_obfuscator())
        .pipe(gulp.dest('public/js'));
});