(function() {
    'use strict';

    // Gulp
    var gulp = require('gulp');

    // Load Plug-Ins
    var $ = require('gulp-load-plugins')(),
        babelify = require('babelify'),
        browserify = require('browserify'),
        browsersync = require('browser-sync'),
        buffer = require('vinyl-buffer'),
        del = require('del'),
        nano = require('gulp-cssnano'),
        source = require('vinyl-source-stream'),
        wiredep = require('wiredep')(),
        historyApiFallback = require('connect-history-api-fallback');

    // Paths
    var buildDir = './build',
        input = {
            assets: './src/assets/**/*',
            gulpfile: './gulpfile.js',
            index: './src/index.html',
            scripts: './src/**/*.js',
            styles: './src/sass/**/*.scss',
            stylesMain: './src/sass/main.scss',
            layout: './src/**/*.tpl.html'
        },
        output = {
            assetsDir: [buildDir, 'assets'].join('/'),
            bowerScripts: 'vendor.js',
            bowerStyles: 'vendor.css',
            index: 'index.html',
            scripts: 'app.js',
            scriptsDir: [buildDir, 'scripts'].join('/'),
            styles: 'app.css',
            stylesDir: [buildDir, 'styles'].join('/'),
            layout: 'layout.js',
            layoutDir: [buildDir, 'layout'].join('/')
        };

    // Configuration
    var config = {
        // build
        isDevBuild: false,
        includeBowerSourcemaps: false,

        // serve
        hostname: 'your-domain.com',
        ports: {
            dev:  8942,
            test: 8943
        },

        // plug-ins
        autoprefixer: {browsers: ['last 2 versions'], remove: false},
        browsersync: {logLevel: 'silent', port: 3003},
        htmlmin: {collapseWhitespace: true},
        ngAnnotate: {single_quotes: true},
        sass: {includePaths: ['src/sass/']}
    };

    // Main Tasks
    gulp.task('default', ['watch']);

    gulp.task('build', $.sequence(['clean'], ['assets', 'index', 'bower', 'scripts', 'styles', 'layout']));

    gulp.task('watch', ['build:dev'], function() {
        gulp.watch(input.index, ['index']);
        gulp.watch(input.scripts, ['scripts-rebuild']);
        gulp.watch(input.styles, ['styles']);
        gulp.watch(input.layout, ['layout']);
    });

    // Sub-Tasks
    gulp.task('assets', function() {
        gulp.src(input.assets)
            .pipe(gulp.dest(output.assetsDir));
    });

    gulp.task('bower', ['bower-scripts', 'bower-styles']);

    gulp.task('bower-scripts', function() {
        return gulp.src(wiredep.js)
            .pipe($.if(config.includeBowerSourcemaps, $.sourcemaps.init()))
            .pipe($.if(!config.isDevBuild, $.ngAnnotate(config.ngAnnotate).on('error', handleError)))
            .pipe($.concat(output.bowerScripts))
            .pipe($.if(!config.isDevBuild, $.uglify()))
            .pipe($.if(config.includeBowerSourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(output.scriptsDir));
    });

    gulp.task('bower-styles', function() {
        return gulp.src(wiredep.css)
            .pipe($.concat(output.bowerStyles))
            .pipe($.if(config.includeBowerSourcemaps, $.sourcemaps.init()))
            .pipe(nano())
            .pipe($.if(config.includeBowerSourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(output.stylesDir));
    });

    gulp.task('build:dev', $.sequence('set-dev', 'build', 'serve'));

    gulp.task('clean', function() {
        return del(buildDir, {force: true});
    });

    gulp.task('index', reload(function() {
        return gulp.src(input.index)
            .pipe($.if(!config.isDevBuild, $.htmlReplace({browsersync: ''})))
            .pipe($.if(!config.isDevBuild, $.htmlmin(config.htmlmin)))
            .pipe(gulp.dest(buildDir));
    }));

    gulp.task('lint', ['lint:gulpfile', 'lint:src']);
    gulp.task('lint:gulpfile', lint(input.gulpfile));
    gulp.task('lint:src', lint(input.scripts));

    gulp.task('scripts', ['lint'], reload(function() {
        return browserify('./src/app/_app.js', {debug: true})
            .transform(babelify)
            .bundle()
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source(output.scripts))
            .pipe(buffer())
            .pipe($.if(config.isDevBuild, $.sourcemaps.init({loadMaps: true, debug: true})))
            .pipe($.if(!config.isDevBuild, $.ngAnnotate(config.ngAnnotate).on('error', handleError)))
            .pipe($.if(!config.isDevBuild, $.uglify()))
            .pipe($.if(config.isDevBuild, $.sourcemaps.write('.')))
            .pipe(gulp.dest(output.scriptsDir));
    }));

    gulp.task('scripts-rebuild', function(done) {
        $.sequence('scripts', done);
    });

    gulp.task('serve', function(done) {
        browsersync(config.browsersync);
        $.connect.server({
            port: config.ports.dev,
            root: buildDir,
            proxy: [config.hostname, config.ports.dev].join(':')
        });
        done();
    });

    gulp.task('set-dev', function(done) {
        config.isDevBuild = true;
        done();
    });

    gulp.task('styles', function() {
        return gulp.src(input.stylesMain)
            .pipe($.if(config.isDevBuild, $.sourcemaps.init()))
            .pipe($.sass(config.sass).on('error', $.sass.logError))
            .pipe($.autoprefixer())
            .pipe($.concat(output.styles))
            .pipe($.if(!config.isDevBuild, nano()))
            .pipe(gulp.dest(output.stylesDir))
            .pipe(browsersync.reload({stream: true}))
            .pipe($.if(config.isDevBuild, $.sourcemaps.write('.')));
    });

    gulp.task('layout', reload(function() {
        return gulp.src(input.layout)
            .pipe($.if(!config.isDevBuild, $.htmlmin(config.htmlmin)))
            .pipe($.ngHtml2js({moduleName: 'layout'}).on('error', handleError))
            .pipe($.concat(output.layout))
            .pipe($.if(!config.isDevBuild, $.uglify()))
            .pipe(gulp.dest(output.layoutDir));
    }));

    // Helpers
    function handleError(error) {
        // logs an error without killing the gulp pipeline
        $.util.log($.util.colors.red(error));
    }

    function lint(files) {
        return function() {
            return gulp.src(files)
                .pipe($.eslint())
                .pipe($.eslint.format());
        };
    }

    function reload(task) {
        // wraps a task function to invoke the browsersync reload method at the end of the pipeline
        return function() {
            task().pipe(browsersync.reload({stream: true}));
        };
    }

    // Serve & Reload
    gulp.task('serve', function() {
        browsersync.init({
            server: {
                baseDir: buildDir,
                middleware: [ historyApiFallback() ]
            }
        });
    });
})();