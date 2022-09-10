const { dest, series, src, watch, parallel } = require('gulp')
const babel = require('gulp-babel')
const browsersync = require('browser-sync').create()
const del = require('del')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

const cleanup = () =>
  del(['./public/assets/css/*.css', './public/assets/js/*.js'])

const reload = (done) => {
  browsersync.reload()
  done()
}

const watchedFiles = () => {
  watch('./src/**/*.js', series(buildJavascript))
  watch('./src/assets/scss/**/*.scss', series(buildStyles))
  watch('./public/*.html', reload)
  watch('**/*.json', reload)
}

const buildJavascript = () => {
  return src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./public/assets/js'))
    .pipe(browsersync.stream())
}

const buildStyles = () => {
  return src('./src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('./public/assets/css'))
    .pipe(browsersync.stream())
}

const server = () => {
  browsersync.init({
    server: {
      baseDir: './public'
    },
    open: false
  })
}

// exports.dev = series(parallel(watchedFiles, server))
exports.dev = parallel(watchedFiles, server)