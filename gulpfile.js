var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var fs = require('fs');

var handleError = function(err) { console.log(err); if (this.emit) { this.emit('end'); }};


var paths = {
  dev: {
    scripts: './assets/dev/scripts/*.js',
    style: './assets/dev/style/*.scss',
    templates: './views/*.jade',
    config: 'config.json'
  },
  build: {
    scripts: './assets/build/scripts/',
    style: './assets/build/style/',
    templates: './*.html'
  }
}

gulp.task('compile-css', function () {
  del([paths.build.style], function(err) {
    if (err) handleError(err);
    gulp.src(paths.dev.style)
      .pipe(plugins.sass({onError: handleError}))
      .pipe(plugins.concat('style.css'))
      .pipe(plugins.minifyCss())
      .pipe(plugins.rename({extname: '.min.css'}))
      .pipe(gulp.dest(paths.build.style));
  });
});

gulp.task('compile-js', function () {
  del([paths.build.scripts], function(err) {
    if(err) handleError(err);
    gulp.src(paths.dev.scripts)
      .pipe(plugins.concat('scripts.js'))
      .pipe(plugins.uglify())
      .pipe(plugins.rename({extname: '.min.js'}))
      .pipe(gulp.dest(paths.build.scripts));
  });
});

gulp.task('compile-html', function () {
  var conf = JSON.parse(fs.readFileSync('./config.json', 'utf8') );

  gulp.src('./views/index.jade')
    .pipe(plugins.jade({locals: conf}))
    .pipe(gulp.dest('./'))
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(plugins.webserver({
      livereload: true,
      fallback: 'index.html'
    }));
});

gulp.task('compile', ['compile-css', 'compile-js', 'compile-html'], function() {
})

gulp.task('watch', function() {
  gulp.watch(paths.dev.scripts, ['compile-js']);
  gulp.watch(paths.dev.style, ['compile-css']);
  gulp.watch(paths.dev.templates, ['compile-html']);
  gulp.watch(paths.dev.config, ['compile-html']);
});

gulp.task('default', ['compile', 'serve', 'watch'], function() {
});
