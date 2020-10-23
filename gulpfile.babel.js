import gulp from 'gulp'
import browserSync from 'browser-sync'
import del from 'del'

import { paths } from './gulp/config'
import environments from 'gulp-environments'

const development = environments.development;
const production = environments.production;

/*** Import specific tasks ***/
import { styles } from './gulp/template'
import { scripts } from './gulp/template'
import { views } from './gulp/template'
import { imagesCopy } from './gulp/template'
import { resize } from './gulp/template'
import { fontsCopy } from './gulp/template'
import { phpCopy } from './gulp/template'

/***  Start the engine ***/
const server = () => {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
	open: false,
    notify: false
  })
}

const reload = (done) => {
  browserSync.reload();
  done();
}

const watch = () => {
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload))
  gulp.watch(paths.styles.src, gulp.series(styles, reload))
  gulp.watch(paths.views.src, gulp.series(views, reload))
}

/*** Clean ***/
const clean = () => del([ 'public' ])

/*** Copy images and fonts ***/
export const images = gulp.series(imagesCopy)
export const fonts = gulp.series(fontsCopy)
export const php = gulp.series(phpCopy)

/*** Custom environments ***/
const dev = gulp.series(clean, gulp.parallel(server, scripts, images, styles, views, php, watch))
const prod = gulp.series(clean, gulp.series(clean, scripts, images, styles, views, fonts, php))

let build = production() ? prod : dev

export default build