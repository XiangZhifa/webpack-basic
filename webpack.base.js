const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    //多入口
    entry: {
        //多页面，配置多个入口
        home: "./src/index.js",
        // other: "./src/other.js"
    },
    // watch: true,
    // watchOptions: {    //监控的选项
    //     poll: 10,   //每秒监控10次
    //     aggregateTimeout: 500,    //防抖，500毫秒内打包一次
    //     ignored: /node_modules/,    //需要忽略的文件，不进行监控
    // },
    resolve: {    //解析 第三方包
        modules: [path.resolve('node_modules')],

        // 指定 package.json 中的入口字段
        // mainFields: ['style','main'],

        // 指定 入口文件的名字 默认是index.js
        // mainFiles: ['index.js'],

        // 按拓展名寻找，这样引入文件时可以简化
        // extensions: ['js', 'css'],

        alias: {    //别名
            bootstrapCss: 'bootstrap/dist/css/bootstrap.css'
        }
    },
    output: {
        //[name]代表home或者other
        filename: "js/[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
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
        //配置环境变量(dev/production)
        new Webpack.DefinePlugin({
            ENV: JSON.stringify('production'),
            FLAG: 'true',
            EXPRESSION: '1+1'
        }),
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
            {from: './doc', to: './doc'}    //从 根目录下的doc目录 拷贝到 dist目录下的 doc 目录
        ]),
        //在打包后的代码中添加注释
        new Webpack.BannerPlugin('make by Jeffery')
    ]
};