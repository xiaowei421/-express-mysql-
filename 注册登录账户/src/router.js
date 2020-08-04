//1，获取第三方库
const express = require('express');
const formidable = require('formidable')
const path = require('path');
const model = require('./model');
const tokenUtil = require('./token')

//2,获取路由对象
const router = express.Router();

//设置允许跨域请求
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //设置完请求头后，交给后续的中间件进行处理
    next();
});

//3,编写get方法，地址为getHerolist
router.get('/getHerolist', (req, res) => {
    model.getHerolist((err, data) => {
        if (err) {
            res.json({ code: 201, msg: err })
        } else {
            res.json({ code: 200, data })
        };
    });
});

//4,删除数据接口
router.get('/daleteheroByid', (req, res) => {
    //获取请求参数id
    const { id } = req.query;
    model.daleteheroByid(id, (err, data) => {
        if (err) {
            res.json({ code: 201, msg: '删除失败' });
        } else {
            res.json({ code: 200, msg: '删除成功' });
        };
    });
});

//5,添加数据
router.post('/addHero', (req, res) => {
    //获取请求参数
    const { name, gender, img } = req.body;
    // 将数据添加到数据库
    model.addHero(name, gender, img, (err, data) => {
        if (err) {
            res.json({ code: 201, msg: '添加失败' });
        } else {
            res.json({ code: 200, msg: '添加成功' });
        };
    });
});

// 上传图片
router.post('/uploadFile', (req, res) => {
    console.log(req.body); //是一个空对象
    // 利用第三方库帮助我们处理上传
    const form = formidable({
        uploadDir: path.join(__dirname, 'upload'), //设置上传目录
        keepExtensions: true //保存上传文件的后缀名
    });
    form.parse(req, (err, fields, files) => {
        //读取上传文件的路径
        const filePath = files.avatar.path;
        // console.log(filePath);
        const fileName = path.basename(filePath);
        res.json({ code: 0, src: fileName });
    });
});


//6,定义通过英雄id和英雄数据的接口
router.get('/getHeroByid', (req, res) => {
    //获取英雄id
    const { id } = req.query;
    model.getHeroByid(id, (err, data) => {
        if (err) {
            res.json({ code: 201, msg: '获取失败' });
        } else {
            res.json({ code: 200, data: data[0] })
        };
    });
});

//7,更新数据
router.post('/updateHero', (req, res) => {
    const { id, name, gender, img } = req.body;
    // 调用updateHero方法，写入数据库
    model.updateHero(id, name, gender, img, (err, data) => {
        if (err) {
            res.json({ code: 201, msg: '更新失败' });
        } else {
            res.json({ code: 200, msg: '更新成功' })
        };
    });
})

//8,注册用户
router.post('/register', (req, res) => {
    // 调用model层，把数据存到数据库
    model.register(req.body, (err, result) => {
        if (err) {
            res.json({ code: 201, msg: '注册失败' })
        } else {
            //   创建token
            const myToken = tokenUtil.createToken(req.body.username)
            res.json({ code: 200, msg: '注册成功', myToken });
        };
    });
});

// 9, 验证用户名
router.post('/validate', (req, res) => {
    model.validate(req.body, (err, data) => {
        if (data.length > 0) {
            res.json({ code: 200, msg: '用户已存在' });
        } else {
            res.json({ code: 201, msg: '用户可以注册' });
        };
    });
});

//10,登录
router.post('/login', (req, res) => {
    model.login(req.body, (err, result) => {
        if (err) {
            res.json({ code: -1, msg: err })
        } else if (result.length === 0) {
            res.json({ code: 201, msg: '用户不存在或者密码错误' })
        } else {
            //   创建token
            const myToken = tokenUtil.createToken(req.body.username)
            res.json({ code: 200, msg: '登录成功', myToken })
        }
    })
});
//导出模块
module.exports = router;