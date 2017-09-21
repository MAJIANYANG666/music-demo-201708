var gulp = require('gulp');
var del = require('del');
var postcss = require('gulp-postcss');
gulp.task('rm', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist/**']);
});
gulp.task('postcss',['rm'], function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
  return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});
gulp.task('default',['rm','postcss'])
