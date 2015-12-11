/**
 * Build client side JavaScript
 */
var webpack = require("webpack");
var webpackConfig = require('../webpack.config');

module.exports = function (gulp, opts) {
    gulp.task('webpack', function (cb) {
        webpack(webpackConfig, function(err, stats) {
            err ? console.error(err) : console.log(stats.toString());
            cb();
        });
    });
};
