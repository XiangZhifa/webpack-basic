// webpack 遵从 node 语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer: {    //开发服务器的配置
        port: 8888,
        progress: true,
        contentBase: './dist',
        open: true,    //自动打开浏览器
        compress: true,    //对代码进行压缩
    },
    mode: 'production',   //打包模式 分为 production development
    entry: "./src/index.js",   //入口
    output: {   //出口
        filename: "dist.[hash:8].js",    //打包后的文件名  限制hash为8位
        path: path.resolve(__dirname, 'dist'),   //路径必须是绝对路径
    },
    plugins: [     //数组，存放所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,    //删除HTML属性的双引号
                collapseWhitespace: true,   //将HTML代码压缩为一行
            },
            hash: true   //添加hash戳，避免缓存，每次生成新的文件
        })
    ]
};