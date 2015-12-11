var path = require('path');
var webpack = require('webpack');
var rootDir = __dirname;

// Webpack Plugins
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin   = webpack.optimize.DedupePlugin;
var DefinePlugin   = webpack.DefinePlugin;
var BannerPlugin   = webpack.BannerPlugin;

module.exports = {
    devtool: 'source-map',
    debug: true,
    cache: true,
    watch: true,
    verbose: true,
    displayErrorDetails: true,
    context: rootDir,
    stats: {
        colors: true,
        reasons: true
    },

    //devServer: {
    //    inline: true,
    //    colors: true,
    //    historyApiFallback: true,
    //    contentBase: 'src/public',
    //    publicPath: '/__build__'
    //},

    // entry points for client side JavaScript packages
    entry: {
        'angular2': [
            'es6-shim',
            '@reactivex/rxjs',
            'zone.js',
            'reflect-metadata',
            'angular2/angular2',
            'angular2/core',
            'angular2/router',
            'angular2/http'
        ],
        'radar': [
            './src/app/ecommerce/ecommerce_app.ts'
        ]
    },

    // output angular2 and radar to __dist__/js folder
    output: {
        path: path.normalize(rootDir + '/__dist__/js'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    // rx resolves to reactivex/rxjs
    resolve: {
        root: rootDir,
        extensions: ['','.ts','.js','.json'],
        alias: {
            'rx': '@reactivex/rxjs'
        }
    },

    module: {
        loaders: [
            { test: /\.json$/,  loader: 'json' },
            { test: /\.css$/,   loader: 'raw' },
            { test: /\.html$/,  loader: 'raw' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less'},
            { test: /\.ts$/,    loader: 'ts',
                query: {
                    'ignoreDiagnostics': []
                },
                exclude: [
                    /\.min\.js$/,
                    /\.spec\.ts$/,
                    /\.e2e\.ts$/,
                    /test/,
                    /node_modules/
                ]
            }
        ],
        noParse: [
            /rtts_assert\/src\/rtts_assert/,
            /reflect-metadata/
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'dev',
            'VERSION': '123'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new CommonsChunkPlugin({
            name: 'angular2',
            minChunks: Infinity,
            filename: 'angular2.js'
        }),
        new CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        })
    ],

    node: {
        crypto: false,
        __filename: true
    }
};
