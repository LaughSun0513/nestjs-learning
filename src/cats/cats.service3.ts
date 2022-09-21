import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService3 {
    constructor() { }
    server3() { 
        return '我是第三个service3 我得依赖一下service2'
    }
}
