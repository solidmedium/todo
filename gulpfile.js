const { src, dest, parallel, series, watch } = require('gulp');

const babel         = require('gulp-babel');
const sourcemaps    = require('gulp-sourcemaps');
const plumber       = require('gulp-plumber');
const notify        = require('gulp-notify');
const sass          = require('gulp-sass');
const rollup        = require('gulp-rollup');

// paths to assets
const paths = {
    scss: './src/scss/',
    js: './src/js/',
    dist: './dist/',
    node: './node_modules/'
};

// SCSS development tasks
function scss() {
    return src(paths.scss + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass()) // process sass
        .pipe(sourcemaps.write(''))
        .pipe(dest(paths.dist + 'css/'));
}

function js() {
    return src([
        paths.js + '*.js',
    ])
    .pipe(sourcemaps.init(''))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(rollup({
      // any option supported by Rollup can be set here.
      input: paths.js + '/index.js',
      output: {
        file: 'index.js',
        format: 'cjs',
        // dir: 'assets/dist/'
      },
    }))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write(''))
    .pipe(dest(paths.dist + 'js/'));
}

/* ########################
###### WATCH TASKS ########
######################### */
function watchFiles() {
	// watch SCSS changes
    watch(paths.scss + '*.scss', parallel(scss));
    // watch course builder js
    watch(paths.js + '*.js', parallel(js));
}

const watching = parallel(watchFiles);

/* ########################
######## EXPORTS ##########
######################### */
exports.js = js;
exports.scss = scss;
exports.watch = watching;

/* ########################
##### DEFAULT TASKS #######
######################### */
// run 'gulp' to run default tasks
exports.default = parallel(scss, js, watchFiles);
