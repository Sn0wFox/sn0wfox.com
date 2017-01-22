"use strict";

const gulp = require('gulp');                     // Local gulp lib
const gsass = require('gulp-sass');               // To compile sass & scss files
const gpug = require('gulp-pug');                 // To compile pug files
const gwebpack = require('webpack-stream');       // To use webpack with gulp

const webpack = require('webpack');               // Local webpack lib
const del = require('del');                       // To erase some file during cleaning tasks

const wpconf = require('./webpack.config.js');

/**
 * Compiles TypeScript files from src/
 * using the typings.
 */
gulp.task('build:ts', () => {
  return gulp
    .src('src/index.ts')
    .pipe(gwebpack(wpconf, webpack))
    .pipe(gulp.dest('dist/js'));
});

/**
 * Compiles Pug files at the root of src/.
 */
gulp.task('build:pug', () => {
  return gulp
    .src('src/*.pug')
    .pipe(gpug())
    .pipe(gulp.dest('dist'));
});

/**
 * Compiles Sass (.sass and .scss) files at the root of src/.
 */
gulp.task('build:sass', () => {
  return gulp
    .src(['src/*.scss', 'src/*.sass'])
    .pipe(gsass())
    .pipe(gulp.dest('dist/css'));
});

/**
 * Copies static files (e.g. pictures, .ico and things needed)
 * from src/assets into dist/.
 */
gulp.task('build:assets', () => {
  return gulp
    .src('assets/**/*')
    .pipe(gulp.dest('dist'));
});

/**
 * Cleans the dist folder by removing it.
 */
gulp.task('clean', () => {
  return del('dist/**/*');
});

/**
 * Builds all files needed.
 */
gulp.task('build', gulp.parallel(
  'build:pug',
  'build:sass',
  'build:assets',
  'build:ts'));

/**
 * Watches all .sass .scss .pug .ts files and assets folder,
 * and recompiles/copies them when they change.
 */
gulp.task('watch', () => {
  gulp.watch(['src/**/*.scss', 'src/**/*.sass'], gulp.series('build:sass'));
  gulp.watch(['src/**/*.pug'], gulp.series('build:pug'));
  gulp.watch(['src/**/*.ts'], gulp.series('build:ts'));
  gulp.watch(['assets/**/*'], gulp.series('build:assets'));
});