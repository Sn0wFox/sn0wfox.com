const gulp      = require('gulp');              // Local gulp lib
const gsass     = require('gulp-sass');         // To compile sass & scss files
const gpug      = require('gulp-pug');          // To compile pug files
const gwebpack  = require('webpack-stream');    // To use webpack with gulp
const gutil     = require('gulp-util');         // To log anything gulp style
const gmaps     = require('gulp-sourcemaps');   // To generate Sass source maps
const grevrep   = require('gulp-rev-replace');  // To generate Sass source maps

const del       = require('del');               // To erase some file during cleaning tasks
const path      = require('path');              // To manage path expressions correctly
const webpack   = require('webpack');           // Local webpack lib
const notifier  = require('node-notifier');     // To show notifications
const merge     = require('merge-stream');      // To merge several streams

require('colors');

/****************************
 * CONFIG
 ****************************/

const wpconf          = require('./webpack.config.js');         // Local webpack config
const DEV             = process.env.SNFX_BUILD_MODE === 'dev';  // Dev mode or not
const PROD            = process.env.SNFX_BUILD_MODE === 'prod'; // Prod mode or not

const SRC_ROOT        = 'src';
const APP_FOLDER      = 'app';
const ASSETS_FOLDER   = 'assets';
const DIST_ROOT       = 'dist';
const APP_ROOT        = path.join(SRC_ROOT, APP_FOLDER);
const DIST_APP        = path.join(DIST_ROOT, APP_FOLDER);
const DIST_ASSETS     = path.join(DIST_APP, ASSETS_FOLDER);
const ASSETS_ROOT     = path.join(SRC_ROOT, ASSETS_FOLDER);
const BOOTSTRAP_ROOT  = path.join('node_modules', 'bootstrap');

const features = [
  '.',
  'portfolio',
  '50x',
  '404'
];


/****************************
 * PUBLIC TASKS
 ****************************/

/**
 * Builds all files needed.
 * If the build mode is set to dev it also enables
 * build notifications and sources watchers.
 */
gulp.task('build', (done) => {
  gulp.parallel(buildPug, buildSass, buildAssets)((error) => {
    let next = [buildTs];
    if(DEV) {
      next.push('watch');
      let notifierOptions = {
        title: 'Sn0wFox.com builder',
        sound: false
      };
      notifierOptions.message = error ? '[ERROR] Build failed. See terminal.' : 'Build successful.';
      notifierOptions.icon = error ? path.join(__dirname, ASSETS_ROOT, 'images/logo-black.png') : path.join(__dirname, ASSETS_ROOT, 'images/logo.png');
      notifier.notify(notifierOptions);
    } else if(PROD) {
      next.push(cacheBust);
    }

    if(error) {
      gutil.log('[ERROR]'.red, error);
    }

    gulp.series(next)(done);
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
    .src(buildEntries('pug'), {base: APP_ROOT})
    .pipe(gpug())
    .on('error', function(err) {
      error = err;
      gutil.log('[ERROR]'.red, error.message);
      this.emit('end');
    })
    .on('end', () => notify('Pug', error))
    .pipe(gulp.dest(DIST_APP));
}
Object.defineProperty(buildPug, 'name', {value: 'build:pug'});

/**
 * Compiles Sass (.scss) files.
 */
function buildSass() {
  let error = null;
  return gulp
    .src(buildEntries('scss'), {base: APP_ROOT})
    .pipe(gmaps.init({loadMaps: true, largeFile: true}))
    .pipe(gsass({
      outputStyle: PROD ? 'compressed' : 'nested'
    }))
    .on('error', function(err) {
      error = err;
      gutil.log('[ERROR]'.red, error.message);
      this.emit('end');
    })
    .on('end', () => notify('Sass', error))
    .pipe(gmaps.write('.', {destPath: DIST_APP}))
    .pipe(gulp.dest(DIST_APP));
}
Object.defineProperty(buildSass, 'name', {value: 'build:sass'});

/**
 * Copies static files (e.g. pictures, .ico and things needed)
 * from src/assets into dist/.
 */
function buildAssets() {
  let error = null;
  return merge(
    gulp.src(path.join(ASSETS_ROOT, '/**/*'), {base: SRC_ROOT}),
    gulp.src(path.join(BOOTSTRAP_ROOT, 'fonts/*'), {base: BOOTSTRAP_ROOT}))
    .on('error', function(err) {
      error = err;
      gutil.log('[ERROR]'.red, error.message);
      this.emit('end');
    })
    .on('end', () => notify('Assets', error))
    .pipe(gulp.dest((file) => {
      return file.base === SRC_ROOT ? DIST_APP : DIST_ASSETS;
    }));
}
Object.defineProperty(buildAssets, 'name', {value: 'build:assets'});

/**
 *
 */
function cacheBust() {
  return gulp
    .src(buildEntries('html').map((out) => out.replace(APP_ROOT, DIST_APP)), {base: APP_ROOT})
    // .pipe(grevrep({
    //   manifest: gulp.src(path.join(DIST_APP, 'manifest.css.json'))
    // }))
    .pipe(grevrep({
      manifest: gulp.src(path.join(DIST_ROOT, 'manifest.js.json')),
      modifyReved: (file) => path.posix.relative(APP_FOLDER, file)
    }))
    .pipe(gulp.dest(DIST_APP));
}
Object.defineProperty(buildAssets, 'name', {value: 'build:cache-bust'});


/****************************
 * HELPERS
 ****************************/

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

/**
 * A generic function to build entry points of a given
 * file extension, based on Sn0wFox.com features.
 * @param ext The extension to build entry points for.
 * @returns {Array} The array of entry points.
 */
function buildEntries(ext) {
  return features.map((feature) => {
    return path.join(APP_ROOT, feature, 'index.' + ext)
  });
}