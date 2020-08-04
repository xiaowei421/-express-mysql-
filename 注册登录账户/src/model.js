//1，导入第三方模块
const contionmysql = require('mysql');
//2,创建一个数据库连接
const connection = contionmysql.createConnection({
    host: '127.0.0.1', // 数据库服务器的地址
    user: 'root', // 数据库的账号 
    password: 'huiaihui2464', // 数据库的密码
    database: 'wangze' // 数据库名称
});


//3,连接数据库或打开数据库
connection.connect((err) => {
    if (!err) {
        console.log('数据库连接成功');
    } else {
        console.log('数据库连接失败');
    };
});

//4,获取全部数据
const getHerolist = (callback) => {
    connection.query('select * from heros', (err, data) => {
        callback(err, data);
    });
};

//5,通过id删除当数据
const daleteheroByid = (id, callback) => {
    connection.query('delete from heros where id=' + id, (err, data) => {
        callback(err, data)
    });
};

//6,新增数据
const addHero = (name, gender, img, callback) => {
    connection.query('insert into heros (name,gender,img) values (?,?,?)', [name, gender, img], (err, data) => {
        callback(err, data);
    });
};

//7，通过id获取数据
const getHeroByid = (id, callback) => {
    connection.query('select * form heros where id=', [id], (err, data) => {
        // console.log('errrrrrr', err); //id数据
        // console.log('daaaaa', data); //undefind
        callback(err);
    });
};


// 8, 更新英雄
const updateHero = (name, gender, img, id, callback) => {
    connection.query('update heros set name=?,gender=?,img=? where id=?', [name, gender, img, id], (err, data) => {
        callback(err, data);
    });
};

//9,注册
const register = (data, callback) => {
    const { username, password } = data;
    connection.query('insert into user set ?', { username, password }, callback)
};



//10,查询用户名
const validate = (username, callback) => {
    // console.log(username); //{ username: '黑马' }
    //查看数据库
    connection.query('select * from user where username=?', [username.username], (err, data) => {
        // console.log(err);//异常数据
        // console.log(data); //响应数据
        callback(err, data)
    })
};
// 11,用户登录
const login = (data, callback) => {
    // 查找数据库，是否有匹配的用户
    console.log('dataaaaaaaa', data);
    const { username, password } = data;
    connection.query('select * from user where username=? and password=?', [username, password], callback)
};
//暴露接口
module.exports = {
    getHerolist,
    daleteheroByid,
    addHero,
    getHeroByid,
    updateHero,
    register,
    validate,
    login
};
/*
总结：
    所有往数据库增删改查，第一个参数为异常数据，第二个为数据
    注意点查看数据，如果是对象需要获取对象
*/