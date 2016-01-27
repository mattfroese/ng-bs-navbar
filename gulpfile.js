var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var source = require('gulp-sourcemaps');
var mario = require('gulp-plumber');
var mainBowerFiles = require('main-bower-files');

var INPUT = 'src/';
var OUTPUT = 'dist/';

function arg (test) {
  var found = false;
  process.argv.forEach(function (val, index, array) {
    if (found) return;
    if (val === test || val === '--' + test) found = true;
  });
  return found;
}
function mushroom (e) {
  if (e.fileName) {
    console.log(e.fileName);
  }
  console.log(e.message);
  require('beepbeep')(2);
  this.emit('end');
}

gulp.task('scripts', function () {
  var files = mainBowerFiles('**/*.js').concat([
    INPUT + 'js/module.js',
    INPUT + 'js/provider.js',
    INPUT + 'js/directive.js'
  ]);
  return gulp.src(files)
  .pipe(source.init({loadMaps: true}))
  .pipe(mario(mushroom))
  .pipe(require('gulp-jsvalidate')())
  .pipe(concat('ng-bs-navbar.js'))
  .pipe(arg('production')
    ? require('gulp-uglify')({
      mangle: false
    }) : gutil.noop())
  .pipe(source.write('maps'))
  .pipe(gulp.dest(OUTPUT));
});

gulp.task('css:theme', function () {
  var processors = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-calc'),
    require('postcss-color-function')(),
    require('autoprefixer')('last 2 versions')
  ];
  if (arg('production')) {
    processors.push(require('csswring'));
  }
  var files = [ INPUT + 'css/ng-bs-navbar-theme-dark.css' ];
  return gulp.src(files)
  .pipe(source.init({loadMaps: true}))
  .pipe(mario(mushroom))
  .pipe(postcss(processors))
  .pipe(concat('ng-bs-navbar-theme-dark.css'))
  .pipe(source.write('maps'))
  .pipe(gulp.dest(OUTPUT));
});

gulp.task('css', function () {
  var processors = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-calc'),
    require('postcss-color-function')(),
    require('autoprefixer')('last 2 versions')
  ];
  if (arg('production')) {
    processors.push(require('csswring'));
  }
  var files = mainBowerFiles('**/*.css').concat([ INPUT + 'css/ng-bs-navbar.css' ]);
  return gulp.src(files)
  .pipe(source.init({loadMaps: true}))
  .pipe(mario(mushroom))
  .pipe(postcss(processors))
  .pipe(concat('ng-bs-navbar.css'))
  .pipe(source.write('maps'))
  .pipe(gulp.dest(OUTPUT));
});

gulp.task('watch', function () {
  gulp.watch([ INPUT + 'css/*.css'], ['css', 'css:theme']);
  gulp.watch([ INPUT + 'js/*.js'], ['scripts']);
});

gulp.task('stream', ['scripts', 'css', 'css:theme','watch']); // alias
gulp.task('default', ['stream']);
gulp.task('production', ['scripts', 'css', 'css:theme']);
