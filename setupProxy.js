const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/data', {
            target: 'https://echarts.apache.org/examples',
            changeOrigin: true
        }),
    )
}