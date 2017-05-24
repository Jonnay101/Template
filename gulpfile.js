var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// callback function for error logging
function errorLog (error) {
  console.error.bind(error);
  this.emit('end');
}

// scripts task
// browserifies and uglifies js file
gulp.task('scripts', function() {
  gulp.src(['src/js/script.js'])
    .pipe(browserify())
    .on('error', console.error.bind(console))
    .pipe(uglify())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('dist'))
})

// styles task
// converts sass to css and compresses it also reloads server
gulp.task('styles', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError)) //.on('error', console.error.bind(console))
    .pipe(sourcemaps.write('./maps'))
    .pipe(postcss([
      autoprefixer({"browsers": ['last 2 versions']})
    ]))
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
})

// image task
// compresses image file size
gulp.task('image', function() {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

// watch task
// watches all tasks
gulp.task('watch', function() {

  livereload.listen();﻿ // localhost:3000 and livereload button

  gulp.watch('src/js/*.js', ['scripts'])
  gulp.watch('src/scss/**/*.scss', ['styles']);
})

// default task
// starts all tasks
gulp.task('default', ['scripts', 'styles', 'watch']);
