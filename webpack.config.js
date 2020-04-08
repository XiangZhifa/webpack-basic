let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    //多入口
    entry: {
        home: "./src/index.js",
        // other: "./src/other.js"
    },
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
    ]
};