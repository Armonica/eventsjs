'use strict';

const gulp = require('gulp'),
    merge = require('merge2'),
    tsc = require('gulp-typescript'),
    origWebpack = require('webpack'),
	webpack = require('webpack-stream'),
    typedoc = require("gulp-typedoc"),
    del = require('del'),
    mocha = require('gulp-mocha'),
    tslint = require('gulp-tslint');

const project = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('build', function () {

  let result = gulp.src('./src/**/*.ts')
    .pipe(tsc(project));

  let js = result.js
  .pipe(gulp.dest('./lib'));

  let dts = result.dts.pipe(gulp.dest('./lib'));

  return merge([js,dts]);

});

gulp.task('pack', ['build'], function () {

	return gulp.src('./lib/events.js')
    .pipe(webpack({
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel'}
        ]
      },
      output: {
        filename: 'events.js',
        libraryTarget: 'umd',
        library: 'events'
      }
    }, origWebpack))
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['pack']);