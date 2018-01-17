var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.node = {fs: "empty"};
webpackConfig.externals = {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['es6-shim', 'mocha', 'chai'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-es6-shim',
            'karma-chrome-launcher',
        ],
        files: [
            './source/models.jsx',
            './test/test.jsx',
        ],
        exclude: [
            '**/*.swp'
        ],
        preprocessors: {
            './*': ['webpack', 'sourcemap'],
            './test/test.jsx': ['webpack', 'sourcemap'],
            './source/models.jsx': ['webpack', 'sourcemap'],
        },
        port: 9876,
        autoWatch: true,
        browsers: ["ChromeHeadlessNoSandbox"],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: [
                    "--no-sandbox", // required to run without privileges in docker
                ]
            }
        },
        singleRun: true,
        concurrency: Infinity,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        }
    });
};