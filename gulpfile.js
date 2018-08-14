var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber'); 
var browserSync = require('browser-sync').create();

  dir = {
    src: 'src',
    dist: 'build',
    nm: 'node_modules'
  },
  files = { 
    JS: [
      `${dir.nm}/bxslider/dist/jquery.bxslider.min.js`,
      `${dir.nm}/slick-carousel/slick/slick.min.js`,
      `${dir.src}/js/global.js`
    ],
  },
  imageminOptions = {
    optimizationLevel: 7,
    progressive: true
  };

gulp.task('default', ['css', 'js'], function() {
    gulp.watch("./src/js/*.js", ['js']);
    gulp.watch("./src/scss/**/*.scss", ['css']);
});

// Compila css (Sass)
gulp.task('css', function(){
   return gulp.src(`${dir.src}/scss/**/*.scss`)
       .pipe(sourcemaps.init({ loadMaps: true }))
       .pipe(plumber())
       .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError)) //expanded, nested, compact, compressed 
       .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest(`${dir.src}/files`))
       .pipe(browserSync.stream());
});

// Compila js 
gulp.task('js', function () {
   gulp.src(`${dir.src}/js/drimer.js`)
     .pipe(gulp.dest(`${dir.src}/files/`))
     .pipe(uglify()) 
     .pipe(rename({ extname: '-min.js' }))
     .pipe(gulp.dest(`${dir.src}/files/`))
     
});

//compila recursos.js
gulp.task('js-recursos', () => {
  gulp
    .src( files.JS  )
    .pipe( concat('recursos-min.js') )
    .pipe( uglify() ) 
    .pipe( gulp.dest(`${dir.src}/files`) )
});

//optimiza imágenes
gulp.task('media', () => {
  gulp.src('./src/img/**/*.{png,jpg,jpeg,gif,svg,ico,webp,mp4,mp3}')
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest('./src/arquivos/img'))
})


gulp.task('files', ['js-recursos','media']);


