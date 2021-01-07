const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
        externals: [
                {
                        react: {
                                root: 'React',
                                commonjs2: 'react',
                                commonjs: ['react'],
                                amd: 'react',
                        },
                },
                {
                        'react-dom': {
                                root: 'ReactDOM',
                                commonjs2: 'react-dom',
                                commonjs: ['react-dom'],
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
                                                "minify-mangle-names",
                                                "@babel/plugin-transform-react-jsx",
                                                "@babel/plugin-syntax-dynamic-import",
                                                "@babel/plugin-proposal-class-properties",
                                                "@babel/plugin-proposal-export-default-from"
                                        ]
                                }
                        },
                ]
        },
        resolve: {
                extensions: ['*', '.js', '.jsx']
        }
}