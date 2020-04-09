console.log('HomePage');

class HomePage {
    constructor() {
        console.log('HomePage constructor.');
    }
}

let home = new HomePage();

const xhr = new XMLHttpRequest();
// webpack-dev-server 默认监听 8080端口，我们利用 webpack-dev-server 将请求转发至 3000端口
xhr.open('GET', '/api/user', true);

xhr.onload = () => {
    console.log(xhr.response);
};

xhr.send();

xhr.open('GET', '/mock', true);

xhr.onload = () => {
    console.log(xhr.response);
};

xhr.send();
