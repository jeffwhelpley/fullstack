/**
 * Load gulp tasks from each of the task files
 */
var gulp        = require('gulp');
var fs          = require('fs');
var path        = require('path');
var slash       = path.normalize('/');
var dir         = __dirname + slash + 'gulp';
var taskRegex   = /^task\.(.*)\.js$/;

var opts = {
    rootDir: __dirname,
    buildDir: '__build__',
    tsCode: ['src/**/*.ts', 'test/**/*.ts']
};

fs.readdirSync(dir).forEach(function (fileName) {
    if (taskRegex.test(fileName)) {
        require(dir + slash + fileName)(gulp, opts);
    }
});
