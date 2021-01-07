const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
        mode: "production",
        entry: './packages/rootz-core-prod.js',
        output: {
                path: path.resolve(__dirname + '/dist'),
                filename: "rootz-core.min.js",
                libraryTarget: 'umd',   // Important
                umdNamedDefine: true,   // Important
                globalObject: "typeof self !== 'undefined' ? self : this"
        },
        optimization: {
                minimize: true,
        },
});