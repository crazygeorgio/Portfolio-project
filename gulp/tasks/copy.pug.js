'use strict';

module.exports = function() {
  $.gulp.task('copy:pug', function() {
    return $.gulp.src('./source/**/*.pug', { since: $.gulp.lastRun('copy:pug') })
    	//.pipe($.gp.imagemin())
    	//.pipe($.gp.flatten())
    	.pipe($.gp.rename({
			extname: '.jade'
		}))
      	.pipe($.gulp.dest($.config.pugImportPath));
  	});
};