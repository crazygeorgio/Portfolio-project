'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function() {
    var spriteData = $.gulp.src('./source/images/png-for-sprite/*.png')
      .pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      }));

    var imgStream = spriteData.img
      .pipe($.buffer())
      .pipe($.gp.imagemin({
        use: [$.optPNG()]
      }))
      //.pipe($.gp.tinypng('VI6Y8kDOlJPat45s63ccM4jM5a4Vw7QR'))
      .pipe($.gulp.dest($.config.root + '/assets/img'));
    
    var cssStream = spriteData.css
      .pipe($.gp.csso())
      .pipe($.gulp.dest($.config.root + '/assets/css'));

    return $.merge(imgStream, cssStream);
  })
};