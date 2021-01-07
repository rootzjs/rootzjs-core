const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
        mode: "production",
        entry: [ 
                './packages/rootz-core-dev.js',
                './packages/index.js'
        ],
        output: {
                path: path.resolve(__dirname + '/dist'),
                filename: "rootz-core.dev.js",
                libraryTarget: 'umd',   // Important
                umdNamedDefine: true,   // Important
                globalObject: "typeof self !== 'undefined' ? self : this"
        },
        plugins: [
                new webpack.IgnorePlugin(/^(react|prop-types)$/),
        ],
        optimization: {
                minimize: false,
        },
});