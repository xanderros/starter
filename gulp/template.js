import gulp from 'gulp'
import browserSync from 'browser-sync'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify-es'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import nunjucks from 'gulp-nunjucks-render'
import environments from 'gulp-environments'
import notify from 'gulp-notify'
import prettify from 'gulp-prettify';
import frontMatter from 'gulp-front-matter';
import embedSvg from 'gulp-embed-svg';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import webp from 'gulp-webp';

const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const changed = require('gulp-changed');

import { paths } from './config'

const development = environments.development;
const production = environments.production;

/*** Errors ***/
const onError = function(err) {
  notify.onError({
    message:  "Error: <%= error.message %>",
  }) (err)

  this.emit('end')
}

/*** SASS compiling ***/
export const styles = () => {
  return gulp.src(paths.styles.src)
      .pipe(development( sourcemaps.init() ))
      .pipe(sass({
        outputStyle: 'compressed'
      }))
      .on('error', onError)
      .pipe(autoprefixer())
      .pipe(production( cleanCSS() ))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream())
}

/*** Scripts minify ***/
export const scripts = () => {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe( uglify() )
      .pipe(concat('script.min.js'))
      .pipe(gulp.dest(paths.scripts.dest))
}

/*** Injects each page into main layout template ***/
const basename = require('path').basename;

export const views = () => {
  return gulp.src(paths.views.src)
      .pipe(frontMatter({ property: 'data' }))
      .pipe(nunjucks({
        path: ['src/templates/']
      }))
      .pipe(prettify({
        indent_size: 2,
        wrap_attributes: 'auto', // 'force'
        preserve_newlines: false,
        end_with_newline: true
      }))
      .pipe(embedSvg({
        root: 'src/img/',
        selectors: '.inline-svg' // only replace tags with the class inline-svg
      }))
      .on('error', onError)
      .pipe(gulp.dest('./build/'))
}

/*** Copy/Resize/Format/Optimize images ***/

// specify different image sizes
const sizes = [
  { width: 480, percentage: 100, quality: 90, suffix: '_mob' },
  { width: 960, percentage: 100, quality: 80, suffix: '_mob@2x' },
  { percentage: 50, quality: 90, suffix: '' },
  { percentage: 100, quality: 80, suffix: '@2x' },
];

// jpg and png
export const imagesJpgPng = () => {
  let stream;
  sizes.forEach((size) => {
    stream = gulp
        .src(['src/img/*.{png,jpg}'])
        .pipe(changed(paths.images.dest))
        .pipe(imageResize({
          imageMagick: true,
          width: size.width,
          percentage: size.percentage
        }))
        .pipe(
            rename((path) => {
              path.basename += `${size.suffix}`;
            }),
        )
        .pipe(imagemin([
              imageminPngquant({quality: [0.5, 0.7]}),
              imageminMozjpeg({quality: size.quality})
            ], { verbose: true }
        ))
        .pipe(gulp.dest(paths.images.dest));
  });
  return stream;
}

// generate webp
export const imagesWebp = () => {
  let stream;
  sizes.forEach((size) => {
    stream = gulp
        .src(['src/img/*.{png,jpg}'])
        .pipe(changed(paths.images.dest, {hasChanged: changed.compareContents}))
        .pipe(imageResize({
          imageMagick: true,
          width: size.width,
          percentage: size.percentage
        }))
        .pipe(
            rename((path) => {
              path.basename += `${size.suffix}`;
            })
        )
        .pipe(webp({quality: 70}, {verbose: true}))
        .pipe(gulp.dest(paths.images.dest));
  });
  return stream;
}

// Copy and optimize svg images
export const imagesSvg = () => {
  return gulp.src(['src/img/*.svg'])
      .pipe(imagemin([
            imageminSvgo({
              removeViewBox: false
            })
          ]
      ))
      .pipe(gulp.dest(paths.images.dest));
}

// Copy favicons
export const imagesFolders = () => {
  return gulp.src(['src/img/**/*'])
      .pipe(gulp.dest(paths.images.dest));
}

/*** Copy fonts ***/
export const fontsCopy = () => {
  return gulp.src(paths.fonts.src)
      .pipe(gulp.dest(paths.fonts.dest));
}

/*** Copy files from root ***/
export const rootCopy = () => {
  return gulp.src(paths.root.src)
      .pipe(gulp.dest(paths.root.dest));
}