const express = require('express');
const webpack = require('webpack');
const webpackMiddleWare = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();

const webpackCompiler = webpack(webpackConfig);

app.use(webpackMiddleWare(webpackCompiler));

app.get('/user', (req, res) => {
    res.json({name: 'Webpack Server'});
});

app.listen(3000);