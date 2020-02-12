let mix = require('laravel-mix');
require('laravel-mix-svg-sprite');

mix.js('assets/js/main.js', 'public/js')
   .sass('assets/scss/main.scss', 'public/styles')
   .setPublicPath('public')
   .browserSync({
    proxy: 'robatronPrime.localhost',
    files: ['public/css/main.css', 'public/js/main.js', 'public/*'],
   })
   .options({
      processCssUrls: false,
   });