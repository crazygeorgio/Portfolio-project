'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/blocks/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./source/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch(['./source/images/**/*.+(jpg|jpeg|png|gif)', './source/blocks/**/*.+(jpg|jpeg|png|gif)'], $.gulp.series('copy:image'));
    $.gulp.watch('./source/**/svg-icon*.svg', $.gulp.series('sprite:svg'));
    $.gulp.watch('./source/fonts/**/*.*', $.gulp.series('copy:fonts'));
  });
};