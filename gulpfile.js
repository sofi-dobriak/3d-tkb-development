const proxy = '3d';
const projectName = '3d';
// const projectName = 'template';
const webPackSetting = true;

const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
// pug
const pug = require('gulp-pug');
// css
const sass = require('gulp-sass')(require('sass'));

const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// js
const importFile = require('gulp-file-include');

// img
const cache = require('gulp-cache');
// svg
const svgSprites = require('gulp-svg-sprites');
// eslint
const eslint = require('gulp-eslint');

// webpack
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackProdConfig = require('./webpackprod.config.js');

const addParameterToFileAndSave = require('./bundle_helpers/addParameterToFileAndSave.js');

const rootPath = `./wp-content/themes/${projectName}`;
const paths = {
  root: rootPath,
  templateStyles: {
    main: './src/assets/s3d/styles/pages',
  },
  templates: {
    pages: './src/pug/pages/*.pug',
    src: './src/pug/**/*.pug',
    dest: rootPath,
  },
  phpTemplates: {
    src: './src/assets/s3d/template/*.php',
    dest: `${rootPath}/assets/s3d/template/`,
  },
  styles: {
    main: './src/assets/s3d/styles/main.scss',
    importsFiles: 'src/assets/s3d/styles/assets/templates.scss',
    stylesPages: 'src/assets/s3d/styles/pages',
    src: './src/**/*.scss',
    dest: `${rootPath}/assets/s3d/styles/`,
  },
  styles_v2: {
    main: './src/assets/s3d/styles/main_v2.scss',
    src: './src/**/*.scss',
    dest: `${rootPath}/assets/s3d/styles/`,
  },
  scripts: {
    src: './src/**/*.js',
    dest: `${rootPath}/assets/s3d/scripts/`,
  },
  ts: {
    src: './src/assets/s3d/scripts/gulp-modules/ts/*.ts',
    dest: `${rootPath}/assets/s3d/scripts/`,
  },
  fonts: {
    src: './src/assets/fonts/**/*',
    dest: `${rootPath}/assets/fonts`,
  },
  images: {
    src: './src/assets/s3d/images/**/*',
    dest: `${rootPath}/assets/s3d/images`,
  },
  svgSprite: {
    src: './src/assets/s3d/svg-sprite/*.svg',
    dest: './src/assets/s3d/svg-sprite/sprite/',
  },
  gulpModules: {
    src: './src/assets/s3d/scripts/gulp-modules/*.js',
    dest: `${rootPath}/assets/s3d/scripts/`,
  },
  static: {
    src: './src/static/**/*.*',
    dest: `${rootPath}/static/`,
  },
  markers: {
    src: `./src/assets/s3d/images/markers/`,
    watchFolder: `./src/assets/s3d/images/markers/*`,
  }
};

// слежка
function watch() {
  gulp.watch(paths.templateStyles.main, watchScssTemplates);
  gulp.watch(paths.styles.src, gulp.parallel(styles, styles_v2));
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.phpTemplates.src, phpTemplates);
  if (webPackSetting) {
    gulp.watch(paths.scripts.src, scripts); // for webpack
  }
  gulp.watch(paths.gulpModules.src, gulpModules);
  // if (typeScriptSetting) {
  //   gulp.watch(paths.ts.src, typeScript);
  // }

  // gulp.watch(paths.ts.src, testJsLint);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
  // gulp.watch(paths.libs.src, libs);
  gulp.watch(paths.static.src, gulp.series(staticFolder, scripts));
  gulp.watch(paths.markers.watchFolder, gulp.series(defineMarkersIcons, staticFolder, scripts));
  gulp.watch('./src/pug/**/*.html', templates);
  gulp.watch('./src/assets/svg-sprite/*.*', svgSprite);
}

// creater templates scss

function watchScssTemplates() {
  scssTemplateCreater();
  return gulp.src(paths.templates.pages);
  // .pipe(gulp.dest(paths.root));
}

function scssTemplateCreater() {
  fs.readdir(paths.styles.stylesPages, (err, nameFiles) => {
    const filesNameWithoutExt = nameFiles.map(el => el.replace(/\.scss/g, ''));
    const contentImportsFiles = filesNameWithoutExt.reduce((acc, el) => acc += `@import './pages/${el}';\n`, '');

    fs.writeFile(contentImportsFiles, paths.styles.importsFiles, null, () => {});
  });
}

function phpTemplates() {
  return gulp.src(paths.phpTemplates.src)
    .pipe(gulp.dest(paths.phpTemplates.dest));
}

// следим за build и релоадим браузер
function server() {
  browserSync.init({
    server: {
      baseDir: './',
      routes: {},
      middleware: function (req, res, next) {
          if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
              console.log('[POST => GET] : ' + req.url);
              req.method = 'GET';
          }
          next();
      }
    },
    // server: paths.root,
    // notify: false,
    // proxy,
  });
  browserSync.watch([`${paths.root}/**/*.{js,json,png,jpg,gif}`], browserSync.reload);
  browserSync.watch(`${paths.root}/**/*.css`,  () => {
    browserSync.reload('*.css')
  });
}


// очистка
function clean() {
  return del(paths.root);
}

// pug
function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

// eslint
function testJsLint() {
  return gulp.src(paths.ts.src)
    .pipe(eslint())
    .pipe(eslint.format());
  // .pipe(eslint.failAfterError());
}

// scss
function styles() {
  return gulp.src(paths.styles.main)
    .pipe(sourcemaps.init()) // инциализация sourcemap'ов
    .pipe(sass({
      outputStyle: 'expanded', // компиляции в CSS с отступами
    }))
    .on('error', notify.onError({
      title: 'SCSS',
      message: '<%= error.message %>', // вывод сообщения об ошибке
    }))
    .pipe(sourcemaps.write())
    .pipe(rename('s3d.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

function styles_v2() {
  return gulp.src(paths.styles_v2.main)
    .pipe(sourcemaps.init()) // инциализация sourcemap'ов
    .pipe(sass({
      outputStyle: 'expanded', // компиляции в CSS с отступами
    }))
    .on('error', notify.onError({
      title: 'SCSS',
      message: '<%= error.message %>', // вывод сообщения об ошибке
    }))
    .pipe(sourcemaps.write())
    .pipe(rename('s3d2.min.css'))
    .pipe(gulp.dest(paths.styles_v2.dest));
}

// fonts
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

// php
function staticFolder() {
  return gulp.src(paths.static.src)
    .pipe(gulp.dest(paths.static.dest));
}

// svg-sprite
function svgSprite() {
  return gulp.src(paths.svgSprite.src)
  // .pipe(cheerio({
  // 	run: function ($) {
  // 		$('[fill^="#"]').removeAttr('fill');
  // 		$('[style]').removeAttr('style');
  // 	},
  // 	parserOptions: {
  // 		xmlMode: false
  // 	}
  // }))
    .pipe(svgSprites({
      mode: 'symbols',
      preview: false,
      selector: 'icon-%f',
      svg: {
        symbols: 'symbol_sprite.php',
      },
    }))
    .pipe(gulp.dest(paths.svgSprite.dest));
}

// images
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

gulp.task('clear', () => cache.clearAll());

gulp.task('defineMarkersIcons', defineMarkersIcons);

async function defineMarkersIcons() {
  getMarkersFiles();
}
function getMarkersFiles() {
  const files = fs.readdirSync(paths.markers.src);
  addParameterToFileAndSave('./src/static/settings.json', 'markers', files);
}

// webpack
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

// gulp-scripts
function gulpModules() {
  return gulp.src(paths.gulpModules.src)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'JavaScript',
        message: '<%= error.message %>', // выводим сообщение об ошибке
      }),
    }))
    .pipe(importFile({ //
      prefix: '@@', // импортим все файлы, описанные в результируещем js
      basepath: '@file', //
    }))
    .pipe(gulp.dest(paths.gulpModules.dest));
}

exports.templates = templates;
exports.phpTemplates = phpTemplates;
exports.styles = styles;

const additionalTask = [];


if (webPackSetting) {
  exports.scripts = scripts;
  additionalTask.push(scripts);
}


exports.gulpModules = gulpModules;
exports.images = images;
exports.clean = clean;
exports.fonts = fonts;
exports.svgSprite = svgSprite;
exports.staticFolder = staticFolder;
exports.watchScssTemplates = watchScssTemplates;


gulp.task('default', gulp.series(
  watchScssTemplates,
  svgSprite,
  clean,
  ...additionalTask,
  defineMarkersIcons,
  gulp.parallel(styles,styles_v2, phpTemplates, templates, fonts, gulpModules, images, staticFolder),
  gulp.parallel(watch, server),
));


// -- BUILD PRODUCTION
const pathsProd = {
  root: './prod',
  templates: {
    src: `${rootPath}/s3d/*.html`,
    dest: './prod',
  },
  style: {
    src: `${rootPath}/assets/s3d/styles/*.css`,
    dest: './prod/assets/s3d/styles',
  },
  js: {
    src: `${rootPath}/assets/s3d/scripts/*.js`,
    dest: './prod/assets/s3d/scripts',
  },
  fonts: {
    src: `${rootPath}/assets/s3d/fonts/**/*`,
    dest: './prod/assets/fonts',
  },
  static: {
    src: `${rootPath}/s3d/static/**/*.*`,
    dest: './prod/static/',
  },
  images: {
    src: `${rootPath}/assets/s3d/images/**/*`,
    dest: './prod/assets/s3d/images',
  },
};
// CLEAN PROD FOLDER
function _clean() {
  return del(pathsProd.root);
}
// HTML
function _templates() {
  return gulp.src(pathsProd.templates.src)
    .pipe(gulp.dest(pathsProd.root));
}
function _styles() {
  return gulp.src(paths.styles.main)
    .pipe(sourcemaps.init()) // инциализация sourcemap'ов
    .pipe(sass({
      outputStyle: 'compressed', // компресія
    }))
    .on('error', notify.onError({
      title: 'SCSS',
      message: '<%= error.message %>', // вывод сообщения об ошибке
    }))
    .pipe(rename('s3d.min.css'))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(gulp.dest(paths.styles.dest));
  // return gulp.src(pathsProd.style.src)
  //   .pipe(autoprefixer({
  //     cascade: false,
  //   }))
  //   .pipe(cleanCSS())
  //   .pipe(gulp.dest(paths.styles.dest));
}

// FONTS
function _fonts() {
  return gulp.src(pathsProd.fonts.src)
    .pipe(gulp.dest(pathsProd.fonts.dest));
}

// PHP
function _static() {
  return gulp.src(pathsProd.static.src)
    .pipe(gulp.dest(pathsProd.static.dest));
}
// JS
function _scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulpWebpack(webpackProdConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}
// IMG
function _images() {
  return gulp.src(pathsProd.images.src)
    // .pipe(cache(imagemin([
    //   imagemin.gifsicle({
    //     interlaced: true,
    //   }),
    //   imagemin.jpegtran({
    //     progressive: true,
    //   }),
    //   imageminJpegRecompress({
    //     loops: 5,
    //     min: 85,
    //     max: 95,
    //     quality: 'high',
    //   }),
    //   imagemin.svgo(),
    //   imagemin.optipng(),
    //   imageminPngquant({
    //     quality: [0.85, 0.90],
    //     speed: 5,
    //   }),
    // ], {
    //   verbose: true,
    // })))
    .pipe(gulp.dest(pathsProd.images.dest));
}

exports._templates = _templates;
exports._fonts = _fonts;
exports._static = _static;
exports._clean = _clean;
exports._scripts = _scripts;
exports._styles = _styles;
exports._images = _images;

gulp.task('prod', gulp.series(
  _clean,
  gulp.parallel(_templates, _fonts, _static, _scripts, _styles, _images),
));

// gulp.parallel(styles, phpTemplates, templates, fonts, gulpModules, images, staticFolder),
