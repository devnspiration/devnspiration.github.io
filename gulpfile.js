const gulp = require('gulp');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

const files = {
  'js': [ 
    'assets/js/_parts/*.ts'
  ],
  'jsVendor': [
    'assets/js/_vendor/*.js'
  ],
  'cssVendor': [
    'node_modules/normalize.css/normalize.css'
  ]
};

gulp.task('js', () => {
  gulp.src(files.js)
    .pipe(ts({
      noImplicitAny: false,
      outFile: 'main.js'
    }))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('jsVendor', () =>
  gulp.src(files.jsVendor)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
);

gulp.task('css', () =>
  gulp.src(files.cssVendor)
    .pipe(concat('vendor.css'))
    .pipe(clean({
      compatibility: 'ie9'
    }))
    .pipe(gulp.dest('assets/css'))
);

gulp.task('img', () =>
  gulp.src('assets/img/**/*')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 7})
    ]))
    .pipe(gulp.dest('assets/img'))
);

gulp.task('default', ['js', 'jsVendor', 'css']);
