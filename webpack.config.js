// webpack 遵从 node 语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        }),

        new MiniCssExtractPlugin({
            filename: 'main.css', //将所有 css 抽出到 main.css 中
        })
    ],
    module: { //模块
        rules: [    //模块规则
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',    // style-loader 把css插入到head标签中
                    //     options: {
                    //         //可以在其中对进行配置
                    //     }
                    // },
                    MiniCssExtractPlugin.loader, //用来代替 style-loader
                    'css-loader',   //配置css-loader 可以解析@import这种语法
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader',    // style-loader 把css插入到head标签中
                    //     options: {
                    //         //可以在其中对进行配置
                    //     }
                    // },
                    MiniCssExtractPlugin.loader, //用来代替 style-loader
                    'css-loader',   //配置css-loader 可以解析@import这种语法
                    'less-loader'   //.less -> .css
                ]
            },
            //loader的特点是，功能专一
            //loader的用法：用字符串，表示只用一个loader；使用多个loader，需要用 []
            //loader的顺序：从右向左执行、从下向上执行
            //loader还可以写成对象形式，可以用options进行配置
        ],
    }
};