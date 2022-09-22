import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '~/user/user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }
  async use(req: Request | any, res: Response, next: () => void) {
    const token = req.header('authorization');
    console.log('token', token);
    if(!token) {
      next();
      return;
    }

    const user = await this.userService.getUserByToken(token);
    if(!user) {
      next();
      return;
    }
    Logger.log('我是auth中间件,header里有Authorization才可以通过')
    // header上有authorization的值，那就把用户信息挂到req上，否则都没有user
    req.user = user;
    next();
  }
}
