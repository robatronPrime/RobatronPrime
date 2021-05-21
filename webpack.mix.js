let mix = require('laravel-mix');
require('laravel-mix-svg-sprite');

mix.js('assets/js/main.js', 'public/js')
   .sass('assets/scss/main.scss', 'public/styles')
   .setPublicPath('public')
   .browserSync({
      server: 'public',
      proxy: null,
      files: ['public/css/main.css', 'public/js/main.js', 'public/*'],
   })
   .options({
      processCssUrls: false,
   });