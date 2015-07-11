(function() {
    'use strict';

    var gulp = require('gulp'),

    /**
     * Tasks dependencies
     ---------------------------------------------------*/
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-minify-css'),
    csslint = require('gulp-csslint'),
    prefix  = require('gulp-autoprefixer'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify');

    gulp.task('scss', function() {
        return gulp.src('src/theme/scss/main.scss')
        .pipe(sass())
        .pipe(prefix("last 1 version", "> 1%", "ie 8"))
        .pipe(csslint())
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/theme/'));
    });

    gulp.task('default', ['scss']);

})();
