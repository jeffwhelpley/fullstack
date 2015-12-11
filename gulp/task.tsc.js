/**
 * Compiling TypeScript
 */
module.exports = function (gulp, opts) {
    gulp.task('tsc', ['lint'], function () {
        var typescript = require('gulp-typescript');
        var tsProject = typescript.createProject('tsconfig.json');

        tsProject.src()
            .pipe(typescript(tsProject))
            .js
            .pipe(gulp.dest(opts.buildDir));
    });
};
