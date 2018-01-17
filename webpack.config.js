var path = require("path");

module.exports = {
    entry: './source/app.js',
    output: {
        path: path.resolve("./bin/"),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-0"]
                }
            }
        ]
    }
};