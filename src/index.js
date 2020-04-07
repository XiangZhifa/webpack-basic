//所有的ES6语法，如果不用babel转化为ES5会报错
let str = require('./str');
require('./index-style.less');
require('@babel/polyfill');

console.log(str);

let fn = () => {
    console.log('es6 -> es5');
};
fn();

//需配置 @babel/plugin-proposal-class-properties 插件
//才能将 class 语法，转化为 ES5语法，否则打包会报错
function log(source) {
    console.log(source);
    console.log('this is decorator');
}

//需要配置 @babel/plugin-proposal-decorators 插件
//将装饰器语法，转化为 ES5语法
@log
class A {
    a = 'a';
}

let aex = new A();
console.log(aex.a);

// @babel/polyfill 会用es5语法，实现重新一些es6中的api
'aaa'.includes('a');

// import $ from 'expose-loader?$!jquery'; // 用 expose-loader 将 变量 暴露 为全局变量 这种写法是内联loader
// pre 前置loader  normal 普通loader  内联loader  post 后置loader
// import $ from 'jquery';
console.log($);

//webpack打包图片
//1) 在js中创建图片引入
import logo from '../public/assets/logo.png';    //将图片引入,返回的结果是一个新的图片地址
let img = new Image();
// img.src = './public/assets/logo.png';    //不能用相对路径进行配置,否则会报404错误
img.src = logo;
document.body.appendChild(img);
//2) 在css中 通过 background('url') 引入
// ！！！见index-style.less
//3) <img src="" alt="">