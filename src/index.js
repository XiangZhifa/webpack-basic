//所有的ES6语法，如果不用babel转化为ES5会报错
let str = require('./str');
require('./index-style.css');
require('./index-style.less');
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