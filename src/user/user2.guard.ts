import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

// 如果该函数返回true或者调用了next()就会放行当前访问，否则阻断当前访问
@Injectable()
export class UserGuard2 implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request | any>();
        console.log('我是路由守卫,你得先通过auth中间件才能到我这里,我得看看req上有没有user,没有你就过不去了')
        return !!request.user; // 如果有user那就说明通过了路由守卫
    }
}
