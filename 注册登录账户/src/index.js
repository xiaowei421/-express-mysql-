// 1,获取元素
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

// 2 初始化express
const app = express();

// 4 设置静态资源访问目录，用于存放静态页面
app.use(express.static('../pulic'));
//添加一个upload静态目录
app.use(express.static('../upload'))
    //6，给post请求进行处理
app.use(bodyParser.urlencoded())
    //5 使用路由
app.use(router);


// 3 监听端口
app.listen(3001, (err) => {
    if (err) {
        console.log('服务器启动失败', err)
    } else {
        console.log('服务端启动成功')
    };
});