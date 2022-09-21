// 全局的中间件，必须是函数式的
export default (req, res, next) => {
    /* 可以用来做白名单黑名单 拦截路由刚进来
    const whitelist = ['/cats'];
    console.log('全局的中间件函数', req.originalUrl);
    if (whitelist.includes(req.originalUrl)) {
        next();
    }
    else {
        res.send('你是黑名单')
    }
    */

    console.log(`全局函数式: 进入`);
    next();
    console.log(`全局函数式: 退出`);
}