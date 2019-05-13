var gulp         = require('gulp');
var config       = require('../config');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');


// Concat and uglify Javascript
gulp.task('js', function () {
	return gulp
		.src(config.src.jsAll)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('js:watch', function() {
    gulp.watch(config.src.js + '/**/*.js', ['js']);
});

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
