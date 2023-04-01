// List of Dependencies
const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const del = require("del");

// Browser Live Server
function browserLiveServer() {
    browserSync.init({
        server: {
            baseDir: "app/",
        },
    });
}

// SCSS
function compileScss() {
    return src("app/scss/**/*.scss")
        .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
        .pipe(concat("style.min.css"))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 10 version"],
                grid: true,
            })
        )
        .pipe(dest("app/src"))
        .pipe(browserSync.stream());
}

// JavaScript
function javascriptMinification() {
    return src([
        "app/javascript/**.js",
        "!app/src/main.min.js",
    ])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("app/src"))
        .pipe(browserSync.stream());
}

// Images
function imageOptimization() {
    return src("app/images/**/*")
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(dest("dist/images"));
}

// WatchList
function watchRunning() {
    watch(["app/scss/**/*.scss"], compileScss);
    watch(
        ["app/javascript/main.js", "!app/javascript/main.min.js"],
        javascriptMinification
    );
    watch(["app/*.html"]).on("change", browserSync.reload);
}

// Builder
function build() {
    return src(
        [
            "app/css/style.min.css",
            "app/fonts/**/*",
            "app/javascript/main.min.js",
            "app/*.html",
        ],
        { base: "app" }
    ).pipe(dest("dist"));
}

// Dist Cleaner
function cleanDist() {
    return del("dist");
}

exports.browserLiveServer = browserLiveServer;
exports.compileScss = compileScss;
exports.javascriptMinification = javascriptMinification;
exports.imageOptimization = imageOptimization;
exports.watchRunning = watchRunning;
exports.cleanDist = cleanDist;

// > gulp build
exports.build = series(cleanDist, imageOptimization, build);

// > gulp
exports.default = parallel(
    compileScss,
    javascriptMinification,
    browserLiveServer,
    watchRunning
);
