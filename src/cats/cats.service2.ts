import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService2 { 
    server2() { 
        return '我是第二个service2'
    }
}
