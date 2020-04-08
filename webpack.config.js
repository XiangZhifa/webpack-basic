// webpack 遵从 node 语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJs = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    devServer: {    //开发服务器的配置
        port: 8080,
        progress: true,
        contentBase: './dist',
        open: true,    //自动打开浏览器
        compress: true,    //对代码进行压缩
    },
    optimization: {     //优化项
        minimizer: [
            new UglifyJs({      //UglifyJs只能压缩ES5，需要安装配置 babel 之后，将ES6转化为ES5再进行压缩
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss()
        ]
    },
    mode: 'production',   //打包模式 分为 production development
    entry: "./src/index.js",   //入口
    output: {   //出口
        filename: "js/dist.[hash:8].js",    //打包后的文件名  限制hash为8位
        path: path.resolve(__dirname, 'dist'),   //路径必须是绝对路径
        // publicPath: "https://www.baidu.com/"  //publicPath会被加载所有引用的静态资源之前(例如 .png .js .css)
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
            filename: 'css/main.css',   //将所有 css 抽出到 main.css 中
        }),

        new webpack.ProvidePlugin({    //在每个模块中都注入 $
            $: 'jquery'
        })
    ],
    module: { //模块
        rules: [    //模块规则
            // {
            //     test: require.resolve('jquery'),    //配置expose-loader,将jquery中的 $ 暴露为全局变量
            //     use: "expose-loader?$!"
            // },
            {
                test: /\.html$/,
                use: 'html-withimg-loader' //将 html中引用的图片 转化为 dist目录下的图片
            },
            {
                test: /\.(png|jpeg|gif)$/,
                //做一个限制，当图片小于多少k时，用base64进行转化
                //否则用 file-loader 进行转化
                use: {
                    loader: 'url-loader',
                    options: {
                        // limit: 200 * 1024,
                        limit: 1,
                        esModule: false,
                        outputPath: 'img/',
                        // publicPath: 'https://www.baidu.com/img/',  //如果只有图片需要用cdn方式引入时，可以用单独配置publicPath
                    }
                }
            },
            // {
            //     test: /\.(png|jpeg|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             esModule: false
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {    //用 babel-loader 将 ES6 转化为 ES5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],    //处理装饰器语法
                            ["@babel/plugin-proposal-class-properties", {"loose": true}],    //处理class语法
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
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
                    'postcss-loader', //给样式自动加上前缀
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
                    MiniCssExtractPlugin.loader,  //用来代替 style-loader
                    'css-loader',   //配置css-loader 可以解析@import这种语法
                    'postcss-loader', //给样式自动加上前缀
                    'less-loader'   //.less 转换为 .css
                ]
            },
            //loader的特点是，功能专一
            //loader的用法：用字符串，表示只用一个loader；使用多个loader，需要用 []
            //loader的顺序：从右向左执行、从下向上执行
            //loader还可以写成对象形式，可以用options进行配置
        ],
    }
};