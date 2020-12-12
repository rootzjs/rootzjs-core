const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, options) => {
        return {
                mode: "production",
                entry: './src/rootz-core.js',
                externals: [
                        {
                                react: {
                                        root: 'React',
                                        commonjs2: './react',
                                        commonjs: ['./react'],
                                        amd: 'react',
                                },
                        },
                        {
                                'react-dom': {
                                        root: 'ReactDOM',
                                        commonjs2: './react-dom',
                                        commonjs: ['./react-dom'],
                                        amd: 'react-dom',
                                },
                        },
                ],
                module: {
                        rules: [
                                {
                                        test: /\.(js|jsx)$/,
                                        loader: 'babel-loader',
                                        exclude: /node_modules/,
                                        options: {
                                                presets: [
                                                        "@babel/preset-env",
                                                        "@babel/preset-react"
                                                ],
                                                plugins: [
                                                        "@babel/plugin-transform-react-jsx"
                                                ]
                                        }
                                },
                        ]
                },
                plugins: [
                        new webpack.IgnorePlugin(/^(react|prop-types)$/),
                ],
                resolve: {
                        extensions: ['*', '.js', '.jsx']
                },
                output: {
                        path: path.resolve(__dirname + '/dist'),
                        filename: "rootz-core.min.js",
                        libraryTarget: 'umd',   // Important
                        umdNamedDefine: true,   // Important
                        globalObject: "typeof self !== 'undefined' ? self : this"
                },
        }
}