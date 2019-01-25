var install = require("gulp-install");
var gulp = require('gulp');

gulp.src(__dirname + '/templates/**')
  .pipe(gulp.dest('./'))
  .pipe(install());