var gulp = require('gulp'),
  concat = require('gulp-concat');

var paths = [
  './assets/js/**/*.js',
  '!./assets/js/combined.js'
];

gulp.task('default', function () {
  gulp.src(paths)
    .pipe(concat('combined.js'))
    .pipe(gulp.dest('./assets/js/'))
});