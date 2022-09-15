// 所以出现了依赖注入的说法
class A2 {
    AName: string;
    constructor(AName: string) { 
        this.AName = AName;
    }
}

class B2 {
    BName: string;
    constructor(BName: string) { 
        this.BName = BName;
    }
}
// 容器 其实就是一个对象，存储着key和对应的class的实例
class Container {
    obj: any
    constructor() { 
        this.obj = {};
    }
    add(key:string, modules) {
        this.obj[key] = modules;
    }
    get(key:string) { 
        return this.obj[key];
    }
}
const moduleA = new Container();
moduleA.add('a', new A2('xxx1'));
moduleA.add('b', new B2('xxx2'));

class C {
    a2: {
        AName:string;
    };
    b2: {
        BName: string;
    };
    constructor(container) {
        // 有点像 pub/sub
        this.a2 = container.get('a');
        this.b2 = container.get('b');
    }
    run() { 
        console.log(this.a2.AName);
        console.log(this.b2.BName);
    }
}
const c = new C(moduleA);
c.run();
