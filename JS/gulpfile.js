var gulp = require("gulp"),
    del = require("del"),
    babelify = require("babelify"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass"),
    es = require("streamqueue"),
    gulpif = require("gulp-if"),
    karmaServer = require("karma").Server,
    es3ify = require("gulp-es3ify"),
    minifyCss = require("gulp-clean-css"),
    eslint = require("gulp-eslint"),
    concat = require("gulp-concat");

var WebRoot = '../Identifi.App.Web.App/';
var JSLocation = WebRoot + 'Scripts';
var CSSLocation = WebRoot + 'Assets/Css/';
var ImgLocation = WebRoot + 'Assets/Images';
var FontLocation = WebRoot + 'Assets/Fonts';

var bundleTargets = [
    { input: './src/App.jsx', output: 'App.js' }
];

var bundleLoginTargets = [
    { input: './src/Login.jsx', output: 'Login.js' }
];

var ieTransformationPlugins = [
    'transform-class-properties',
    'transform-es2015-block-scoping',
    ['transform-es2015-classes', { loose: true }],
    'transform-proto-to-assign'
];

gulp.task('styles', function () {
    runcss();
    runimages();
    runfonts();
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {

    del.sync(['./output'], { force: true });
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('build', ['set-prod-node-env', 'js', 'js-login', 'styles'], function () { });

gulp.task('build-debug', ['set-dev-node-env', 'js-debug', 'js-login-debug', 'styles'], function () {});

gulp.task('clean', function () {
    del.sync([JSLocation + '/*.*'], { force: true });
    del.sync([CSSLocation + '**'], { force: true });
    del.sync([ImgLocation + '**'], { force: true });
    del.sync([FontLocation + '**'], { force: true });
});

gulp.task('js', function () {

    var args = {
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: false
    };

    bundleTargets.forEach(function (target) {
        console.log(target);
        var bundle = createBundle(target, args);

        executeBundle(bundle, true, target);
    });
});

gulp.task('js-debug', function () {

    var args = {
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: false
    };

    bundleTargets.forEach(function (target) {
        console.log(target);
        var bundle = createBundle(target, args);

        executeBundle(bundle, false, target);
    });
});

gulp.task('js-login', function () {

    var args = {
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: false
    };

    bundleLoginTargets.forEach(function (target) {
        console.log(target);
        var bundle = createBundle(target, args);

        return executeLoginBundle(bundle, true, target);
    });
});

gulp.task('js-login-debug', function () {

    var args = {
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: false
    };

    bundleLoginTargets.forEach(function (target) {
        console.log(target);
        var bundle = createBundle(target, args);

        return executeLoginBundle(bundle, false, target);
    });
});

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

var runimages = function () {
    var updateStart = Date.now();
    gulp.src('./assets/images/*.*')
        .pipe(gulp.dest(ImgLocation));
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
};

var runShimSham = function() {
    var updateStart = Date.now();
    gulp.src('./node_modules/es5-shim/es5-sh*m.min.js')
        .pipe(gulp.dest(JSLocation));
    gulp.src('./node_modules/es5-shim/es5-sh*m.map')
        .pipe(gulp.dest(JSLocation));
    console.log('Updated Shim Sham!', (Date.now() - updateStart) + 'ms');
};

var runfonts = function () {
    gulp.src(['./assets/fonts/**/*', './node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest(FontLocation));
    gulp.src(['./node_modules/robotodraft/fonts/**/*'], { base: './node_modules/robotodraft/fonts/' })
        .pipe(gulp.dest(FontLocation));
    gulp.src('./node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest(FontLocation));

    gulp.src(['./node_modules/material-design-icons/iconfont/*'])
        .pipe(gulp.dest(FontLocation));

    console.log('Moved Fonts!');
};

var runcss = function () {
    var updateStart = Date.now();

    es({ objectMode: true },
        gulp.src('./assets/sass/**/app-prod.scss')
            .pipe(sass().on('error', sass.logError)))
        .pipe(concat('main.css'))
        .pipe(minifyCss()) //disabled for test on build agent
        .pipe(gulp.dest(CSSLocation));

    es({ objectMode: true },
        gulp.src('./assets/sass/**/app-wk-prod.scss')
            .pipe(sass().on('error', sass.logError)))
        .pipe(concat('wk.css'))
        .pipe(minifyCss()) //disabled for test on build agent
        .pipe(gulp.dest(CSSLocation));

    console.log('Updated!', (Date.now() - updateStart) + 'ms');
};

var createBundle = function (target, args) {
    var browserifiedBundle = (browserify(target.input, args))
        .transform([
            babelify, {
                presets: ["es2015", "react", "stage-1"],
                plugins: ieTransformationPlugins
            },
            reactify,
            { sourceMap: true }
        ]);

    return browserifiedBundle;
};

function executeBundle(bundle, prodMode, target) {
    runShimSham();

    return bundle.bundle()
        .on("error", function (err) {
            console.log("Error : " + err.message);
        })
        .pipe(source(target.input))
        .pipe(buffer())
        .pipe(es3ify())
        .pipe(rename(target.output))
        .pipe(gulpif(prodMode == false, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(prodMode, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(JSLocation));
}

function executeLoginBundle(bundle, prodMode, target) {
    runShimSham();

    return bundle.bundle()
        .on("error", function (err) {
            console.log("Error : " + err.message);
        })
        .pipe(source(target.input))
        .pipe(buffer())
        .pipe(es3ify())
        .pipe(rename(target.output))
        .pipe(gulpif(prodMode == false, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(prodMode, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(JSLocation))
        .on('end', function () {
            gulp.src(['./src/IE8/eventListenerPolyfill.js', JSLocation + '/Login.js'])
                .pipe(concat('Login.js'))
                .pipe(gulp.dest(JSLocation));
        });
}

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

/// Debug and development

gulp.task('watch', ['build-debug'], function () {
    gulp.watch('src/**', ['build-debug']);
});

gulp.task('default', ['watch']);
