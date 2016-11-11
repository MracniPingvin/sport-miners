// Globals
var browserSync = require('browser-sync'),
    gulp = require('gulp'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten');
    cssNano = require('gulp-cssnano'),
    fileInclude = require('gulp-file-include'),
    imageMin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence');
    connect = require('gulp-connect');
// Paths
var paths = {
    dist: './dist/',
    src: './assets/'
};

// Clean
gulp.task('clean', require('del').bind(null, [paths.dist]));

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.src + 'styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: [
                'last 2 version',
                'android 2.3',
                'android 4',
                'opera 12'
            ]
        }))
        .pipe(cssNano()).pipe(concat("main.css"))
        .pipe(sourcemaps.write('sourcemaps'))
        .pipe(gulp.dest(paths.dist + 'styles'))
        .pipe( connect.reload() );
});

// Scripts
gulp.task('scripts', function() {
   return gulp.src(paths.src + 'scripts/**/*.js')
       .pipe(sourcemaps.init())
       .pipe(concat('main.js'))
       .pipe(sourcemaps.write('sourcemaps'))
       .pipe(gulp.dest(paths.dist + 'scripts'))
       .pipe( connect.reload() );
});

// Images
gulp.task('images', function() {
    return gulp.src(paths.src + 'images/*')
        .pipe(imageMin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(gulp.dest(paths.dist + 'images'))
        .pipe( connect.reload() );
});

// Html
gulp.task('fileInclude', function() {
    return gulp.src(paths.src + 'templates/*.html')
        .pipe(fileInclude())
        .pipe(gulp.dest(paths.dist))
        .pipe( connect.reload() );
});

gulp.task('html', function(callback) {
    runSequence('fileInclude',
        callback);
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(paths.src + 'fonts/*')
        .pipe(flatten())
        .pipe(gulp.dest(paths.dist + 'fonts'))
        .pipe( connect.reload() );
});

// Default Gulp Build
gulp.task('default', function(callback) {
    runSequence(
        'styles',
        'scripts',
        'fonts',
        'images',
        'html',
        callback);
});

// Gulp Build - Same as Default, but with a clean up beforehand
gulp.task('build', ['clean'], function() {
   gulp.start('default');
});

/* Gulp watch - watch changes of files in 'src' folder (run it by 'gulp watch') */
gulp.task('watch', function() {
    connect.server({
        livereload: true
    });
    gulp.watch('./assets/templates/**/*', ['html']);
    gulp.watch('./assets/scripts/**/*', ['scripts']);
    gulp.watch('./assets/fonts/**/*', ['fonts']);
    gulp.watch('./assets/images/**/*', ['images']);
    gulp.watch('./assets/styles/**/*.scss', ['styles']);
});


    