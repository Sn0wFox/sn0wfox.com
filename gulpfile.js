const gulp      = require('gulp');            // Local gulp lib
const gsass     = require('gulp-sass');       // To compile sass & scss files
const gpug      = require('gulp-pug');        // To compile pug files
const gwebpack  = require('webpack-stream');  // To use webpack with gulp
const gutil     = require('gulp-util');       // To log anything gulp style

const del       = require('del');             // To erase some file during cleaning tasks
const path      = require('path');            // To manage path expressions correctly
const webpack   = require('webpack');         // Local webpack lib
const notifier  = require('node-notifier');   // To show notifications

require('colors');

/****************************
 * CONFIG
 ****************************/

const wpconf        = require('./webpack.config.js');         // Local webpack config
const DEV           = process.env.SNFX_BUILD_MODE === 'dev';  // Dev mode or not

const SRC_ROOT      = 'src';
const DIST_ROOT     = 'dist';
const ASSETS_FOLDER = 'assets';
const ASSETS_ROOT   = path.join(SRC_ROOT, ASSETS_FOLDER);


/****************************
 * PUBLIC TASKS
 ****************************/

/**
 * Builds all files needed an watch non-Ts/Js files.
 * If the build mode is set to dev it also enables
 * build notifications and Webpack watcher.
 */
gulp.task('build', (done) => {
  gulp.parallel(buildPug, buildSass, buildAssets)((error) => {
    if(DEV) {
      let notifierOptions = {
        title: 'Sn0wFox.com builder',
        sound: false
      };
      notifierOptions.message = error ? '[ERROR] Build failed. See terminal.' : 'Build successful.';
      notifierOptions.icon = error ? path.join(__dirname, ASSETS_ROOT, 'images/logo-black.png') : path.join(__dirname, ASSETS_ROOT, 'images/logo.png');
      notifier.notify(notifierOptions);
    }

    if(error) {
      gutil.log('[ERROR]'.red, error);
    }

    gulp.parallel('watch', buildTs)(done);
  });
});

/**
 * Cleans the dist folder by removing it.
 */
gulp.task('clean', () => {
  return del(path.join(DIST_ROOT, '**/*'));
});

/**
 * Watches all .sass .scss .pug files and assets folder,
 * and re-compiles/copies them when they change.
 */
gulp.task('watch', () => {
  process.env.SNFX_WATCH = true;
  gulp.watch([path.join(SRC_ROOT, '/**/*.scss'), path.join(SRC_ROOT, '/**/*.sass')], buildSass);
  gulp.watch([path.join(SRC_ROOT, '/**/*.pug')], buildPug);
  gulp.watch([path.join(ASSETS_ROOT, '/**/*')], buildAssets);
});

/****************************
 * PRIVATE TASKS
 ****************************/

/**
 * Compiles TypeScript files from src/
 * using the typings.
 */
function buildTs() {
  return gulp
    .src([path.join(SRC_ROOT, '/**/*.ts')])
    .pipe(gwebpack(wpconf, webpack))
    .pipe(gulp.dest(DIST_ROOT));
}
Object.defineProperty(buildTs, 'name', {value: 'build:ts'});

/**
 * Compiles Pug files at the root of src/.
 */
function buildPug() {
  let error = null;
  return gulp
    .src(path.join(SRC_ROOT, '/**/*.pug'))
    .pipe(gpug())
    .on('error', function(err) {
      error = err;
      gutil.log('[ERROR]'.red, error.message);
      this.emit('end');
    })
    .on('end', () => notify('Pug', error))
    .pipe(gulp.dest(DIST_ROOT));
}
Object.defineProperty(buildPug, 'name', {value: 'build:pug'});

/**
 * Compiles Sass (.sass and .scss) files at the root of src/.
 */
function buildSass() {
  let error = null;
  return gulp
    .src([path.join(SRC_ROOT, '/**/*.scss'), path.join(SRC_ROOT, '/**/*.sass')])
    .pipe(gsass())
    .on('error', function(err) {
      error = err;
      gutil.log('[ERROR]'.red, error.message);
      this.emit('end');
    })
    .on('end', () => notify('Sass', error))
    .pipe(gulp.dest(DIST_ROOT));
}
Object.defineProperty(buildSass, 'name', {value: 'build:sass'});

/**
 * Copies static files (e.g. pictures, .ico and things needed)
 * from src/assets into dist/.
 */
function buildAssets() {
  let error = null;
  return gulp
    .src(path.join(ASSETS_ROOT, '/**/*'), {base: SRC_ROOT})
    .on('error', function(err) {
      error = err;
      gutil.log('[ERROR]'.red, error.message);
      this.emit('end');
    })
    .on('end', () => notify('Assets', error))
    .pipe(gulp.dest(DIST_ROOT));
}
Object.defineProperty(buildAssets, 'name', {value: 'build:assets'});


/**
 * A generic function to send a notification to the user.
 * @param module The module's name.
 * @param error An optional error object.
 */
function notify(module, error) {
  if(DEV && process.env.SNFX_WATCH) {
    let notifierOptions = {
      title: `Sn0wFox.com builder - ${module}`,
      sound: false
    };
    notifierOptions.message = error ? `[ERROR] ${module} build failed. See terminal.` : `${module} build successful.`;
    notifierOptions.icon = error ? path.join(__dirname, ASSETS_ROOT, 'images/logo-black.png') : path.join(__dirname, ASSETS_ROOT, 'images/logo.png');
    notifier.notify(notifierOptions);
  }
}