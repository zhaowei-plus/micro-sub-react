const webpack = require('webpack')
const { resolve } = require('path')
const { name } = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/layout/index.js',
    // base: '/react',
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@': resolve('./src'),
        },
    },
    output: {
        library: `reactApp`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJson_${name}`,
        globalObject: 'window'
    },
    module: {
        rules: [{
                test: /\.(jsx|js)?$/,
                include: resolve('./src'),
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]-[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: './static/images/[name].[ext]',
                    },
                }, ],
            },
            {
                test: /\.(xlsx|xls)$/,
                loader: 'file-loader',
                options: {
                    name: './static/[name].[ext]',
                },
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    name: './static/fonts/[name].[md5:hash:hex:7].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '项目模板',
            template: 'public/index.html',
            inject: true,
        }),
        new webpack.DefinePlugin({

        }),
    ],
}