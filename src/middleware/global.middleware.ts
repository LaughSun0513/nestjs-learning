// 全局的中间件，必须是函数式的
export const globalMiddleware = (req, res, next) => {
    const whitelist = ['/cats'];
    console.log('全局的中间件函数', req.originalUrl);

    if (whitelist.includes(req.originalUrl)) {
        next();
    }
    else {
        res.send('你是黑名单')
    }
}