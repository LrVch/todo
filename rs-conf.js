(function () {
    'use strict';

    var baseDir = "./app",
        distBaseDir = "./dist";

    module.exports = {
        path: {
            // App
            baseDir: baseDir,
            cssDir: baseDir + "/css/*.css",
            cssDirDest: baseDir + "/css",
            scssDir: baseDir + "/scss/**/*.scss",
            scssDirDest: baseDir + "/scss",
            scssСonnect: baseDir + "/scss/style.scss",
            jsDir: baseDir + "/**/*.js",
            htmlDir: baseDir + "/*.html",
            imgDir: baseDir + "/img/**/*",
            imgDestDir: baseDir + "/img/",
            bowerDir: baseDir + "/bower_components",
            iconDir: baseDir + "/img/",
            extraFiles: [baseDir + "/*.*", "!" + baseDir + "/*.html"],
            allAppFiles: baseDir + "/**/*",
            templatesDir: baseDir + "/templates",
            
            // Dist
            distDir: distBaseDir,
            distCssDir: distBaseDir + "/css/",
            distJsDir: distBaseDir + "/js/",
            distImgDir: distBaseDir + "/img/",
            distDelDir: [distBaseDir + "/**", "!" + distBaseDir],
            allDistFiles: distBaseDir + "/**/*"
        }
    };
})();