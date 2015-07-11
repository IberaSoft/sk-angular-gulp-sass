(function() {
    'use strict';

    var gulp = require('gulp'),

    /**
     * Tasks dependencies
     ---------------------------------------------------*/
    addsrc      = require('gulp-add-src'),
    argv        = require('yargs').argv,
    batch       = require('gulp-batch'),
    concat      = require('gulp-concat'),
    connect     = require('gulp-connect'),
    csslint     = require('gulp-csslint'),
    cssmin      = require('gulp-minify-css'),
    debug       = require('gulp-debug'),
    del         = require('del'),
    gulpif      = require('gulp-if'),
    htmlminify  = require('gulp-minify-html'),
    htmlreplace = require('gulp-html-replace'),
    imagemin    = require('gulp-imagemin'),
    jshint      = require('gulp-jshint'),
    livereload  = require('gulp-livereload'),
    ngAnnotate  = require('gulp-ng-annotate'),
    prefix      = require('gulp-autoprefixer'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch');

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
