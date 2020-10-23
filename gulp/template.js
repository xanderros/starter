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
import webp from 'gulp-webp';

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
    .pipe(sass())
    .on('error', onError)
    .pipe(autoprefixer())
    .pipe(production( cleanCSS() ))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

/*** Scripts minify ***/
export const scripts = () => {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(production( uglify() ))
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


/*** Copy images ***/
export const imagesCopy = () => {
	return gulp
      .src(['src/img/*.{png,jpg,svg,webp}'])
      // .pipe(webp({quality: 75}))
      // .pipe(imagemin([
      //   imageminPngquant({quality: [0.5, 0.7]}),
      //   imageminMozjpeg({quality: 90})
      // ]))
			.pipe(gulp.dest(paths.images.dest))
}

/*** Copy fonts ***/
export const fontsCopy = () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

/*** Copy PHP ***/
export const phpCopy = () => {
  return gulp.src(paths.php.src)
    .pipe(gulp.dest(paths.php.dest));
}