Крохмаль Юрий Владимирович

- добавлена задача по копированию шрифтов в build, watch отслеживает изменения в папке шрифтов;
- добавлена задача генерации png спрайта и попробовал оптимизацию с помощью плагина gulp-tinypng, плагин imagemin почему-то крайне плохо сжимает изображения. Для реализации были установлены дополнительные пакеты merge-stream, imagemin-optipng, vinyl-buffer, плагин gulp.spritesmith



#Учебная сборка Loftschool (выпускной проект №1) 

Stack:
 - Gulp 4.0
 
Getting started:

1. git clone https://github.com/crazygeorgio/Portfolio-project.git
2. cd path/to/
3. npm install gulpjs/gulp-cli -g  // Install the latest Gulp CLI tools globally
4. npm install
5. edit gulp/config.js for your project
6. run "gulp" command to start
