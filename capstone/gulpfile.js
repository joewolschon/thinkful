var gulp = require('gulp'),
  gutil = connect = require('gulp-util'),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload');

var paths = {
  js: [
    '!*.js', 'app/**/*.js', '!**/*.min.js', '!app/bower_components/**/*.js', '!app/vendor/*.js'
  ],
  css: [
    'app/**/*.css', '!**/*.min.css'
  ]
};

gulp.task('start-livereload', function() {
  livereload.listen();
});

gulp.task('package', ['js', 'css']);

gulp.task('dev', ['start-livereload', 'package'], function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('css', function(){
  function createCssPackage (cssPaths, destFile, destDir) {
    gulp.src(cssPaths)
      .pipe(plumber(function(err) {
        gutil.log(gutil.colors.red(err));
        gutil.beep();
      }))
      .pipe(concat(destFile))
      .pipe(gulp.dest(destDir))
  }

  createCssPackage(paths.css, 'combined.min.css', 'app/assets/css/');
});

gulp.task('js', function(){
  function createJsPackage (jsPaths, destFile, destDir, sourceRoot) {
    gulp.src(jsPaths)
      .pipe(plumber(function(err) {
        gutil.log(gutil.colors.red(err));
        gutil.beep();
      }))
      .pipe(sourcemaps.init())
      .pipe(concat(destFile))
      .pipe(uglify({mangle: false}))
      .pipe(sourcemaps.write('.', {sourceRoot: sourceRoot}))
      .pipe(gulp.dest(destDir))
  }

  createJsPackage(paths.js, 'combined.min.js', 'app/assets/js/', '.');
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/'
  });
});

gulp.task('default', ['dev', 'js', 'css', 'connect']);
