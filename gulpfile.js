
// modules

var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , koutoSwiss = require('kouto-swiss')
  , prefixer = require('autoprefixer-stylus')
  , jeet = require('jeet')
  , rupture = require('rupture')
  , imagemin = require('gulp-imagemin')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglifyjs')
  , sourcemaps = require('gulp-sourcemaps')
  , gutil = require( 'gulp-util' )
  , ftp = require( 'vinyl-ftp' )
  , ejs = require("gulp-ejs")
  , connect = require('gulp-connect');

//utils config

var utils = {}

utils.url = 'http://localhost:9000/';
//utils.url = 'https://webserver.com.br';
utils.images = utils.url + '/assets/img';
utils.cover = utils.images + '/cover.jpg';
utils.title = 'Gulp Boilerplate';
utils.description = 'Easy gulp boilerplate powered by Flize team.';


// folders

var src = './src'
  , dist = './dist'

var scripts = [
  './node_modules/jquery/dist/jquery.min.js'
  , src + '/js/onscroll.js'
  , src + '/js/menu.js'
  , src + '/js/form.js'
  , src + '/js/gmaps.js'
  , src + '/js/onload.js'

];

// http server with reload

gulp.task('connect', function() {
  return connect.server({
    root: './dist',
    livereload: true,
    port: 9000
  });
});

// ejs compile

gulp.task('ejs', function() {
return gulp.src('./src/templates/*.ejs')
  .pipe(ejs({
    utils: utils
  }).on('error', gutil.log))
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

// compile all .styl file and generate main.css

gulp.task('css', function() {
  return gulp.src(src + '/css/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), jeet(), rupture()]
      , compress: true
      , 'include css': true
    }))
    .on('error', nocrash)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + '/assets/css'))
    .pipe(connect.reload());
});

// concat all .js files into main.js

gulp.task('js', function() {
  return gulp.src(scripts)
    .pipe(concat('main.js'))
    .pipe(uglify({
      mangle: false,
      outSourceMap: true
    }))
    .on('error', nocrash)
    .pipe(gulp.dest(dist + '/assets/js'))
    .pipe(connect.reload());
});

// minify theme images

gulp.task('imagemin', function() {
  return gulp.src(src + '/img/**/*.{jpg,png,gif,svg}')
    .pipe(imagemin({
      optimizationLevel: 3
      , progressive: true
      , interlaced: true
    }))
    .pipe(gulp.dest(dist + '/assets/img'))
});

// copy font-awesome icons

gulp.task('copyfonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*.{ttf,woff,eof,svg,woff2}')
    .pipe(gulp.dest(dist + '/assets/fonts/'));
});

// copy stuff

gulp.task('copystuffs', function() {
  return gulp.src(src + '/stuffs/**/*.*')
    .pipe(gulp.dest(dist + '/'));
});

// tasks

gulp.task('server', ['connect', 'ejs', 'css', 'js', 'imagemin', 'copystuffs', 'copyfonts'], function() {

  gulp.watch(src + '/templates/**/*.ejs', ['ejs']);
  gulp.watch(src + '/css/**/*.styl', ['css']);
  gulp.watch(src + '/js/**/*.js', ['js']);
  gulp.watch(src + '/img/**/*.{jpg,png,gif}', ['imagemin']);

  console.log('I\'m watching you!');
});

gulp.task('default', ['ejs', 'ejs', 'css', 'js', 'imagemin', 'copystuffs', 'copyfonts'], function() {
  console.log('Gulp Done!');
});

// tasks
function nocrash(error) {
  console.log(error.toString());
  this.emit('end');
}

// deploy task

gulp.task( 'deploy_br', ['ejs', 'css', 'js', 'imagemin', 'copystuffs', 'copyfonts'], function () {

    var conn = ftp.create( {
        host:     'host.com.br',
        user:     'username',
        password: 'password',
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
        './dist/**'
    ];

    var path = '/public_html'

    return gulp.src( globs, { base: './dist', buffer: false } )
        //.pipe( conn.newer( path ) ) // only upload newer files
        .pipe( conn.dest( path ) );

} );

