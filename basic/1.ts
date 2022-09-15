// 啥是依赖注入 我咋知道
class A {
    name: string;
    constructor(name: string) { 
        this.name = name;
    }
}

class B {
    BName: A;
    constructor() { 
        this.BName = new A('bbb'); // B里夹着A,逻辑多了就gg
    }
}

const b = new B();
console.log(b.BName)