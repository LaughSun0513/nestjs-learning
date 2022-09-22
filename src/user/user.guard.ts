import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

// 如果该函数返回true或者调用了next()就会放行当前访问，否则阻断当前访问
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) { }
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request | any>();

    // 读取token
    const authorization = request.header('authorization');
    if (!authorization) {
      return false;
    }
    return this.userService.validateAuthorization(authorization)
  }
}
