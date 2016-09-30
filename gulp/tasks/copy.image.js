'use strict';

module.exports = function() {
  $.gulp.task('copy:image', function() {
    return $.gulp.src(['./source/**/*.+(jpg|jpeg|png|gif)','!**/png-for-sprite*.png'], { since: $.gulp.lastRun('copy:image') })
    	//.pipe($.gp.imagemin())
    	.pipe($.gp.flatten())
      	.pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};