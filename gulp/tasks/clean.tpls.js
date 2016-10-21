'use strict';

module.exports = function() {
  $.gulp.task('clean.tpls', function(cb) {
    return $.rimraf($.config.pugImportPath, cb);
  });
};
