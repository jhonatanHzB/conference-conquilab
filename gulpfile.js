const { dest, series, src, watch, parallel } = require('gulp')
const babel = require('gulp-babel')
const browsersync = require('browser-sync').create()
const del = require('del')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

const cleanup = () =>
  del(['./assets/css/*.css', './assets/js/*.js'])

const reload = (done) => {
  browsersync.reload()
  done()
}

const watchedFiles = () => {
  watch('./assets/js/**/*.js', reload)
  watch('./assets/scss/**/*.scss', series(buildStyles))
  watch('**/*.html', reload)
  watch('**/*.json', reload)
}

const buildJavascript = () => {
  return src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/js'))
    .pipe(browsersync.stream())
}

const buildStyles = () => {
  return src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('./assets/css'))
    .pipe(browsersync.stream())
}

const server = () => {
  browsersync.init({
    server: {
      baseDir: './'
    },
    open: false
  })
}

// exports.dev = series(parallel(watchedFiles, server))
exports.dev = parallel(watchedFiles, server)