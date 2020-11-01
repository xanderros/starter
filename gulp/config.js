export const paths = {
	styles: {
		src: ['src/sass/_main.scss', 'src/sass/helpers/_variables.scss', 'src/sass/styles.scss'],
		dest: 'build/css/'
	},
	scripts: { // Scripts for the whole site
		src: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/lazysizes/lazysizes.min.js',
      './node_modules/gsap/dist/gsap.min.js',
      './node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
      './node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
      './node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js',
			'src/js/main.js'
		],
		dest: 'build/js/'
	},
	views: {
		src: 'src/templates/**/[^_]*.html',
		dest: 'build/'
	},
	fonts: {
		src: 'src/fonts/**/*',
		dest: 'build/fonts'
	},
	images: {
		src: 'src/img/**/*',
		dest: 'build/img/'
	},
	root: {
    src: [
      'src/*.*',
      'src/.*'
    ],
		dest: 'build/'
	}
}