var gulp = require("gulp"),
    RS_CONF = require('./rs-conf.js'),
    browserSync = require("browser-sync").create(),
    minifyCss = require('gulp-minify-css'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require("del"),
    gulpif = require("gulp-if"),
    uglify = require("gulp-uglify"),
    filter = require("gulp-filter"),
    wiredep = require("wiredep").stream,
    useref = require("gulp-useref"),
    size = require("gulp-size"),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    templateCache = require('gulp-angular-templatecache');




// * ====================================================== *
//   DEV
// * ====================================================== *


// cash-templates
// *****************************************************
gulp.task('cash-templates', function () {
    return gulp.src(RS_CONF.path.templatesDir + '/*.html')
        .pipe(templateCache({
            root: "templates/"
        }))
        .pipe(gulp.dest(RS_CONF.path.templatesDir));
});


// autoprefixer
// ******************************************************
gulp.task('autoprefixer', function () {
    return gulp.src(RS_CONF.path.cssDir)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "ie 8"],
            cascade: false
        }))
        .pipe(gulp.dest(RS_CONF.path.cssDirDest));
});

// wiredep
// ******************************************************
gulp.task("wiredep-bower", function () {
    gulp.src(RS_CONF.path.htmlDir)
        .pipe(wiredep({
            directory: RS_CONF.path.bowerDir,
            overrides: {
                // "angular": {
                //     "main": [
                //         "./angular.js"
                //     ]
                // }
            },
            // exclude: ["bower_components/jquery/"],
            exclude: ["bower_components/bootstrap-sass/assets/javascripts/bootstrap.js", "bower_components/jquery/"],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest(RS_CONF.path.baseDir));
});

// scss-compass
// ******************************************************
gulp.task('compass', function () {
  gulp.src(RS_CONF.path.scssDir)
    .pipe(plumber())
    .pipe(compass({
      config_file: RS_CONF.path.compassConfig,
      css: RS_CONF.path.cssDirDest,
      sass: RS_CONF.path.scssDirDest,
      image: RS_CONF.path.iconDir
    }))
    .on("error", notify.onError({
        message: 'Error: <%= error.message %>',
        title: "Compass",
        sound: false // deactivate sound?
    }));
});

// browsersync front-end
// ******************************************************
gulp.task("server", ["compass", "autoprefixer", "wiredep-bower", "cash-templates"], function () {

    browserSync.init({
        port: 9000,
        open: false,
        notify: false,
        server: {
            baseDir: RS_CONF.path.baseDir
        }
    });
    
    gulp.watch("bower.json", ["wiredep-bower"]);
    gulp.watch(RS_CONF.path.scssDir, ["compass"]);
    gulp.watch(RS_CONF.path.cssDir, ["autoprefixer"]).on("change", browserSync.reload);
    gulp.watch(RS_CONF.path.htmlDir).on("change", browserSync.reload);
    gulp.watch(RS_CONF.path.jsDir).on("change", browserSync.reload);
    gulp.watch(RS_CONF.path.templatesDir + "/*.html", ["cash-templates"]);

});

// default
// ******************************************************
gulp.task("default", ["server"]);






// * ====================================================== *
//   BUILD
// * ====================================================== *



// Переносим CSS JS HTML в папку DIST (useref)
// ******************************************************
gulp.task("useref", function () {
    var condition = 'load.js';

    return gulp.src(RS_CONF.path.htmlDir)
        .pipe(useref())
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulpif("*.css", cleanCSS({
            compatibility: "ie8"
        })))
        .pipe(gulp.dest(RS_CONF.path.distDir));
});

// Очищаем директорию DIST
// ******************************************************
gulp.task("clean-dist", function () {
    return del(RS_CONF.path.distDelDir);
});

// Перенос картинок
// ******************************************************
gulp.task("images", function () {
    return gulp.src(RS_CONF.path.imgDir)
        // .pipe(filter(["*.jpg", "*.svg", "*.jpeg", "*.png", "*.webp", "*.gif"]))
        .pipe(gulp.dest(RS_CONF.path.distImgDir));
});

// Перенос api
// ******************************************************
gulp.task("api", function () {
    return gulp.src('./app/api/*.*')
        .pipe(gulp.dest('./dist/api/'));
});

// Перенос шрифтов
// ******************************************************
gulp.task("fonts", function () {
  gulp.src(RS_CONF.path.bootstrapFontsDir)
    // .pipe(filter(["*.eot", "*.svg", "*.ttf", "*.woff", "*.woff2"]))
    .pipe(gulp.dest(RS_CONF.path.distBootstrapFontsDir))
});

// Вывод размера папки APP
// ******************************************************
gulp.task("size-app", function () {
    return gulp.src(RS_CONF.path.allAppFiles).pipe(size({
        title: "APP size: "
    }));
});

// Сборка и вывод размера папки DIST
// ******************************************************
gulp.task("dist", ["useref", "images","api", "fonts", "size-app","dist-server"], function () {
    return gulp.src(RS_CONF.path.allDistFiles).pipe(size({
        title: "DIST size: "
    }));
});

// Собираем папку DIST - только когда файлы готовы
// ******************************************************
gulp.task("build", ["clean-dist", "wiredep-bower"], function () {
    gulp.start("dist");
});

// // Запускаем локальный сервер для DIST
// // ******************************************************
gulp.task("dist-server", function () {
    browserSync.init({
        port: 2000,
        open: true,
        notify: false,
        server: {
            baseDir: RS_CONF.path.distDir
        }
    });
});