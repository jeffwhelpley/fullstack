/**
 * If any file changes, re-run tasks
 */
module.exports = function (gulp, opts) {
    gulp.task('lint', function () {
        var tslint = require('gulp-tslint');
        var tslintConfig = require('../tslint.json');

        return gulp.src(opts.tsCode)
            .pipe(tslint({
                configuration: tslintConfig
            }))
            .pipe(tslint.report('verbose'));
    });
};
