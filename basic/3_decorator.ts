// 啥是装饰器，就是一个方法，然后把类传进去，改改原型，加一点逻辑，不写在class里面
const log = console.log;
const decoratorFun:ClassDecorator = (target) => { 
    target.prototype.name = 'name1111';
    target.prototype.getName = function () { 
        return 'getName' + this.name;
    }
}

const decoratorFun2: PropertyDecorator = (target: any, key: string | symbol) => {
    log('========decoratorFun2=========')
    log(target) // 原型对象
    log(key) // 属性的key
}

const decoratorFun3: MethodDecorator = (target: any, key: string | symbol, descriptor:any) => {
    log('========decoratorFun3=========')
    log(target) // 原型对象
    log(key) // 当前方法的名字
    log(descriptor) // 当前属性描述符
}

const decoratorFun4: ParameterDecorator = (target: any, key: string | symbol, index: number) => { 
    log('========decoratorFun4=========')
    log(target) // 原型对象
    log(key) // 当前方法的名字
    log(index) // 当前参数的下标
}


@decoratorFun // 类装饰器
class ClassA {
    @decoratorFun2  // 属性装饰器
    age: number;
    constructor() { }

    @decoratorFun3
    getAge(name:string, @decoratorFun4 age:number) { // 参数装饰器
        return this.age;
    }
}




const obj: any = new ClassA();
log('========obj=========')
log(obj.name)
log(obj.getName())