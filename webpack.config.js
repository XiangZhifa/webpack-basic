const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
    mode: "production",
    //多入口
    entry: {
        //多页面，配置多个入口
        home: "./src/index.js",
        // other: "./src/other.js"
    },

    //1) 源码映射，会单独生成.map文件，代码报错，会标识当前报错的列和行
    // devtool: "source-map",    //增加映射文件，可以帮我们调试源代码
    //2) 不会产生单独文件，但会显示行和列
    //devtool: "eval-source-map",
    //3) 不会产生列，但是是一个单独的映射文件
    //devtool: "cheap-module-source-map",
    //4) 不会产生列，集成在打包后的文件中，不会产生文件
    // devtool: "cheap-module-eval-source-map",

    // watch: true,
    // watchOptions: {    //监控的选项
    //     poll: 10,   //每秒监控10次
    //     aggregateTimeout: 500,    //防抖，500毫秒内打包一次
    //     ignored: /node_modules/,    //需要忽略的文件，不进行监控
    // },

    output: {
        //[name]代表home或者other
        filename: "js/[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        //new 多个 HtmlWebpackPlugin 进行多页应用配置
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "home.html",
            chunks: ["home"]    //代码块中放入对应文件，可以放入多个
        }),
        // new HtmlWebpackPlugin({
        //     template: "./src/index.html",
        //     filename: "other.html",
        //     chunks: ["other"]
        // })

        // 1) cleanWebpackPlugin
        // 2) copyWebpackPlugin
        // 3) bannerPlugin  内置
        //每次打包之前清空dist文件夹
        new CleanWebpackPlugin(),
        //复制文件到dist文件夹下
        new CopyWebpackPlugin([
            {from:'./doc',to:'./doc'}    //从 根目录下的doc目录 拷贝到 dist目录下的 doc 目录
        ]),
        //在打包后的代码中添加注释
        new Webpack.BannerPlugin('make by Jeffery')
    ]
};