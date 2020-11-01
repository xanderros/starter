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
import { imagesWebp } from './gulp/template'
import { imagesJpgPng } from './gulp/template'
import { imagesSvg } from './gulp/template'
import { imagesFolders } from './gulp/template'
import { resize } from './gulp/template'
import { fontsCopy } from './gulp/template'
import { rootCopy } from './gulp/template'

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
  gulp.watch(paths.images.src, gulp.series(images, reload))
}

/*** Clean ***/
const clean = () => del([ 'public' ])

/*** Copy images and fonts ***/
export const images = gulp.series(imagesJpgPng,imagesWebp,imagesSvg,imagesFolders)
export const fonts = gulp.series(fontsCopy)
export const root = gulp.series(rootCopy)

/*** Custom environments ***/
const dev = gulp.series(clean, gulp.parallel(server, scripts, images, styles, views, fonts, root, watch))
const prod = gulp.series(clean, gulp.series(clean, scripts, images, styles, views, fonts, root))

let build = production() ? prod : dev

export default build