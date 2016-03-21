/* jslint node: true */
var gulp = require('gulp');
var html_validation = require('gulp-htmlhint');
var css_validation = require('gulp-css-validator');
var js_validation = require('gulp-jslint');
var uglify = require('gulp-uglify');
var js_obfuscator = require('gulp-js-obfuscator');

gulp.task('default', ['js', 'html', 'css']);

gulp.task('js', function () {
    return gulp.src('app/*.js')
        .pipe(js_validation({
            browser: true,
            strict: false,
        }))
        .pipe(uglify())
        .pipe(js_obfuscator())
        .pipe(gulp.dest('public/js'));
});

gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(css_validation('gulp-css-validator'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(html_validation())
        .pipe(html_validation.failReporter())
        .pipe(gulp.dest('public/'));
});