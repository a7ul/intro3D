var gulp = require('gulp');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');


gulp.task('usemin',['clean'], function () {
  return gulp.src('app/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('compress-scripts',['usemin'], function() {
  return gulp.src('dist/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});


gulp.task('copy-assets',['clean'],function(){
  return gulp.src('app/assets/**/*')
    .pipe(gulp.dest('dist/assets/'));
});

gulp.task('clean', function () {
  return gulp.src('dist/**/*', {read: false})
    .pipe(clean());
});

gulp.task('default',['compress-scripts','copy-assets']);