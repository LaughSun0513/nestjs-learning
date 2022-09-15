import axios from "axios";

// 使用方法装饰器 模拟一个get请求
// 使用闭包函数
const Get = (url:string): MethodDecorator => { 
    return (target, funcName, descriptor: PropertyDescriptor) => { 
        console.log(typeof descriptor.value); // 通过 descriptor描述符里面的value 把axios的结果返回给当前使用装饰器的函数
        const callback = descriptor.value;
        
        axios.get(url).then(result => { 
            callback(result.data.result, {
                code: 200,
            })
        }).catch(err => {
            callback(err, {
                code: 500,
            })
        })
    }
}


class TestAController { 
    constructor() { }
    
    @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
    getList(result:any, code:number) { 
        console.log(result, code)
    }
}   