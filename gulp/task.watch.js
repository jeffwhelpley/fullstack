/**
 * If any file changes, re-run tasks
 */
module.exports = function (gulp, opts) {
    gulp.task('watch', function () {
        //gulp.watch(opts.tsCode, ['lint', 'tsc', 'test.unit']);
        gulp.watch(opts.tsCode, ['lint', 'tsc']);
    });
};
