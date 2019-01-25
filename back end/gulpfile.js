const gulp        = require('gulp'),
      nodemon     = require('gulp-nodemon'),
      watch       = require('gulp-watch'),
      browserSync = require('browser-sync'),
      exec = require('child_process').exec
;

// gulp.task('run', function (){
//     return new Promise(function(resolve, reject) {
//         browserSync({
//             proxy  : {
//                 target: "http://localhost:3000/api/rangers"
//             }
//         });
//         console.log(__dirname + '/bin/www.js');

//         watch(__dirname + '/bin/www.js', function () {
//             gulp.start('bin/www');
//         });
//       resolve();
//     });
//   });

//   gulp.task('lint', function () {
//     gulp.src('./**/*.js')
//       .pipe(jshint())
//   });

//   gulp.task('develop', function () {
//     nodemon({ script: 'www.js'
//             , tasks: ['lint'] })
//       .on('restart', function () {
//         console.log('restarted!')
//       })
//   })


gulp.task('run', function (cb) {
  exec('node bin/www', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
