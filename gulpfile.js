const gulp = require('gulp');
const panini = require('panini');
const browser = require('browser-sync');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const watchify = require('watchify');
const babelify = require('babelify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgSprites = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');
const replace = require('gulp-replace');
const fs = require('fs');
const del = require('del');
const env = process.env.NODE_ENV;
const PRODUCTION = env === 'production';


const clean = function CLEAN(done) {
  return del([
    'build',
    '_package',
    '_staging',
  ]);
};


const pages = function PAGES() {
  return gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages',
      layouts: 'src/layouts',
      partials: 'src/partials',
      helpers: 'src/helpers',
    }))
    .pipe(gulpIf(PRODUCTION, htmlmin({ collapseWhitespace: true }) ))
    .pipe(gulp.dest('build'));
};

const server = function SERVER(done) {
  browser.init({
    server: 'build',
    notify: false,
  });
  done();
};

const svgSpriter = function SVGSPRITES(done) {
  const possibleDirectories = fs.readdirSync('src/assets/svg');

  const directories = possibleDirectories.filter(path => {
    if (path === 'flags') return false;
    return fs.statSync(`${__dirname}/src/assets/svg/${path}`).isDirectory();
  });
  const specialDirs = ['special'];
  let completed = 0;

  if (directories.length === 0) done();

  directories.forEach((dir, i) => {
    const convertStyleToAttrs = specialDirs.indexOf(dir) === -1 ? true : false;

    // const minifyStyles = '';
    gulp.src(`src/assets/svg/${dir}/*.svg`)
    .pipe(plumber())
    .pipe(svgSprites({
      mode:{
        symbol:{
          dest:`build/images/svgSprites`,
          sprite:`${dir}.svg`,
        }
      },
      shape:{
        transform:[
          {
            svgo:{
              plugins:[
                {
                  convertStyleToAttrs,
                },
              ],
            }
          },
        ],
        meta:`src/assets/svg/${dir}/description.yaml`,
      }
    }))
    .pipe(gulp.dest(__dirname))
    .on('finish', () => {
      completed++;
      if (completed === directories.length) {
        done();
      }
    });
  });
};

const resetPages = function RESETPAGES(done) {
  panini.refresh(); // removed layouts / partials and other stuff from cache
  done();
};

const copyFavicons = function COPYFAVICONS() {
  return gulp.src('src/assets/favicons/*.*')
    .pipe(gulp.dest('dist/favicons'));
};

const images = function IMAGES() {
  return gulp.src('src/assets/images/**/*')
    .pipe(gulpIf(PRODUCTION, imagemin()))
    .pipe(gulp.dest('build/images'));
}

const styles = function STYLES(done) {
  // const DEST = env === 'DEV' ? 'dist/temp' : 'temp';
  return gulp.src('./src/assets/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error',  sass.logError))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['ie >=9', '> 1%'],
      cascade: false,
    }))
    .pipe(gulpIf(PRODUCTION, cssnano()))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(sourcemaps.write('.'),{
      includeContent: true,
    })
    .pipe(gulp.dest('build/stylesheets'));

};

// const scriptsWrapper = () => {
//
// }

const scriptsWatch = function SCRIPTSWATCH(done) {
  scripts(true, done);
};

const scriptsBuild = function SCRIPTSBUILD(done) {
  scripts(false, done);
};


const createBundler = function CREATEBUNDLER(includeWatchify) {
  return browserify({
    entries: './src/assets/js/main.js',
    debug: true,
    cache: {},
    packageCache: {},
    plugin: includeWatchify ? [watchify] : [],
  })
  .transform(babelify.configure({
    presets: ['es2015', 'stage-0'],
    plugins:['add-module-exports']
  }));
};

const scripts = function SCRIPTS(watch, callback) {
  let timesCompiled = 0; // temp

  const b = createBundler(watch);

  const bundle = (cb) => {
    b.bundle()
    .once('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(plumber())
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps:true,
    }))
    .pipe(gulpIf(PRODUCTION, uglify()))
    .pipe(rename({
      extname:'.min.js',
    }))
    .pipe(sourcemaps.write('.'),{
      includeContent:true,
    })
    .pipe(gulp.dest('build/js'))
    .once('end', () => {
      b.removeAllListeners('error');
      b.removeAllListeners('end');
      if (typeof cb === 'function') cb();
      if (watch === true) {
        if (timesCompiled === 0) {
          timesCompiled = 1;
        } else if(browser) {
          browser.reload();
        }
      }
    });
  }

  if (watch === true) {
    b.on('update', bundle);
  }
  bundle(callback);
};


const watcher = function WATCHER(done) {
  gulp.watch('src/assets/scss/**/*.scss').on('all',gulp.series(styles, browser.reload));
  gulp.watch('src/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/images/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/assets/svg/**/*').on('all', gulp.series(svgSpriter, browser.reload));
  gulp.watch('src/assets/svg/flags/*').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/flags.json').on('all', gulp.series(styles, resetPages, pages, browser.reload));
  scriptsWatch(done); // this calls done so it can generate the script first before the next step
};

const addHeadContent = (file) => {
  return () => {
    let live;
    try {
      live = fs.readFileSync(`src/env/${file}.html`, 'utf8');
    } catch(e) {
      console.log(e);
      return done();
    }
  
    return gulp.src('build/**/*.html')
      .pipe(replace("</head>", `${live}</head>`))
      .pipe(gulp.dest('build'));
  }
};


const package = () => {
  return gulp.src('build/**/*')
    .pipe(gulp.dest('_package'));
}

const staging = () => {
  return gulp.src('build/**/*')
    .pipe(gulp.dest('_staging'));
}


gulp.task('dev', gulp.series(clean, gulp.parallel(pages, styles, images, svgSpriter, copyFavicons, watcher), server));


gulp.task('build', gulp.series(clean, gulp.parallel(pages, styles, images, svgSpriter, copyFavicons, scriptsBuild)));

gulp.task('package', gulp.series('build', addHeadContent('live'), package));

gulp.task('staging', gulp.series('build', addHeadContent('staging'), staging));