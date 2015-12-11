/**
 * All testing tasks
 */
require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone-microtask');

module.exports = function (gulp, opts) {

    function runJasmineTests(testCode) {
        var jasmine = require('gulp-jasmine');
        var SpecReporter = require('jasmine-spec-reporter');
        var specReporter = new SpecReporter();

        return gulp.src(testCode).pipe(jasmine({
            verbose: true,
            includeStackTrace: true,
            reporter: specReporter
        }));
    }

    gulp.task('test.unit', ['lint', 'tsc'], function () {
        return runJasmineTests([opts.buildDir + '/test/unit/**/*.js']);
    });

    gulp.task('test.integration', ['lint', 'tsc'], function () {
        return runJasmineTests([opts.buildDir + '/test/integration/**/*.js']);
    });

    gulp.task('test.karma', ['lint', 'tsc'], function () {

    });

    gulp.task('test.protractor', ['lint', 'tsc'], function () {

    });

    gulp.task('test', ['test.unit', 'test.integration', 'test.karma', 'test.protractor']);
};
