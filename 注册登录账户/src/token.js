//生成token
const createToken = (username) => {
    //密钥  用来验证真伪
    const key = 'heima =';
    const data = username + '_' + key;
    //生成base64字符串
    const token = Buffer.from(data).toString('base64');
    return token;
};
//验证token是否有效
const verifyToken = (token) => {
    const context = Buffer.feom(token, 'base64').toString('ascil');
    return context.indexOf('heima') > -1;
};

//验证权限方法
const checRole = (req, res) => {
    //获取请求头token，验证token是否有效
    const token = req.headers.authorization;
    if (token) {
        const isVerift = verifyToken(token)
        if (!isVerift) {
            res.json({ code: 201, msg: "你有访问权限" })
        };
    } else {
        res.json({ code: -1, msg: '请带上你的token' })
    };
};

//导出模块
module.exports = {
    createToken,
    verifyToken,
    checRole
};