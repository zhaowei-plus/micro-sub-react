const merge = require('webpack-merge')
const common = require('./webpack.base')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        progress: true,
        port: 1002,
        // 子项目服务支持跨域访问
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        hot: false,
        watchContentBase: false,
        liveReload: false,
        stats: 'errors-only',
        // host: 'local.baas.uban360.net',
        proxy: {
            '/smallapp': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/open/smallapp': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/baas-index': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/ioc-specitem': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/baas-server': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/open/baas-app': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/statics': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/baas-openlab': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/baas-account': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/baas-admin': {
                target: 'http://baas.uban360.net:21006/',
                changeOrigin: true,
            },
            '/data-cube': {
                target: 'https://mock.api.jituancaiyun.com/app/mock/167',
                changeOrigin: true,
            },
        },
    },
})