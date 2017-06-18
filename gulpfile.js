const autoprefixer = require('autoprefixer')
const cssMqPacker = require('css-mqpacker')
const del = require('del')
const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const imagemin = require('gulp-imagemin')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const RevAll = require('gulp-rev-all')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssNested = require('postcss-nested')
const sugarss = require('sugarss')
const metalsmithBuild = require('./metalsmith_build')

// *******************************************************************
// CLEAN
// *******************************************************************
gulp.task('clean', () => del(['public', 'deploy']))

// *******************************************************************
// REV
// *******************************************************************
gulp.task('rev', () => {
  gulp.src('public/**')
    .pipe(RevAll.revision({
      dontRenameFile: ['.html', '.xml', '.json'],
      dontUpdateReference: ['.html', '.xml', '.json']
    }))
    .pipe(gulp.dest('deploy'))
})

// *******************************************************************
// METALSMITH
// *******************************************************************
gulp.task('metalsmith', () => {
  metalsmithBuild()
})

gulp.task('metalsmith-watch', ['metalsmith'], () => {
  gulp.watch(['source/**/*', 'layouts/**/*', '!source/styles.sss'], ['metalsmith'])
})

// *******************************************************************
// STYLESHEETS
// *******************************************************************
const sssPath = 'static_assets/styles.sss'
const postcssPlugins = [
  postcssNested(),
  postcssCustomProperties(),
  cssMqPacker(),
  autoprefixer({ browsers: ['last 2 versions'] })
]

gulp.task('stylesheets', () => {
  return gulp.src(sssPath)
    .pipe(postcss(postcssPlugins, {
      parser: sugarss
    }))
    .pipe(rename({
      extname: '.css'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('public'))
})

gulp.task('stylesheets-watch', ['stylesheets'], () => {
  gulp.watch(sssPath, ['stylesheets'])
})

// *******************************************************************
// IMAGES
// *******************************************************************
const imagesPath = 'static_assets/**/*.{jpg,png,gif,svg}'

gulp.task('images', () => {
  gulp.src(imagesPath)
    .pipe(imagemin())
    .pipe(gulp.dest('public'))
})

gulp.task('images-watch', ['images'], () => {
  gulp.watch(imagesPath, ['images'])
})
