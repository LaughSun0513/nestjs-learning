import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserException } from './user.exception'

@Injectable()
export class UserService {
    login(username:string, password:string) { 
        // throw new HttpException('您无权登录', HttpStatus.FORBIDDEN);
        // throw new HttpException({errcode: 40010, errmsg: '第一个参数可以自定义状态码'}, HttpStatus.FORBIDDEN);
        // throw new UserException(40010, '您无权登录', HttpStatus.FORBIDDEN);
    }
    async getUserByToken(token:string) { 
        if (token === 'lisi') { 
            return {
                name: 'lisi',
                age: 18
            }
        }
        return null;
    }
    validateAuthorization(authorization: string) {
        // 这里去验证authorization 这里直接通过，校验逻辑可以自己写
        // 验证是不是zhangsan
        return true;
    }
}

