const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = smart(base,{
    mode: "development",
    devServer: {
        // 1) 配置一个代理，用于转发请求
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'/api': ''}
            }
        },
        // 2) 前端直接mock数据
        before(app) {   //webpack-dev-server提供的方法
            app.get('/mock', (req, res) => {
                res.json({name: 'Webpack Server Mock Data'});
            });
        },
        // 3) 在服务端中直接启动 webpack，端口 与 服务端端口 一致，可以避免代理
        // 第3种方法，详见 server.js 中 app.use(webpackMiddleWare(webpackCompiler))
    },
    //1) 源码映射，会单独生成.map文件，代码报错，会标识当前报错的列和行
    // devtool: "source-map",    //增加映射文件，可以帮我们调试源代码
    //2) 不会产生单独文件，但会显示行和列
    //devtool: "eval-source-map",
    //3) 不会产生列，但是是一个单独的映射文件
    //devtool: "cheap-module-source-map",
    //4) 不会产生列，集成在打包后的文件中，不会产生文件
    // devtool: "cheap-module-eval-source-map",
});