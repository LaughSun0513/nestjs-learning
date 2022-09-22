import {
  Controller,
  Get,
  Post,
  Req, Res, Body, UseGuards
} from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UserGuard2 } from './user2.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  // http://localhost:3000/user/captcha
  @Get('captcha')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    });
    req.session.captcha = captcha.text.toLowerCase(); // 服务端先写一个开关在这里
    res.type('image/svg+xml');
    res.send(captcha.data); // captcha.data返回一个svg给前端
  }

  // http://localhost:3000/user/create
  @Post('create')
  createUser(@Req() req, @Body() body) {
    const { code } = body;
    const session = req.session.captcha;
    if (session.toLocaleLowerCase() === code.toLocaleLowerCase()) {  // 然后等客户端传过来再验证是不是一个验证码
      console.log('666', session, code);
      return {
        code: 0,
        msg: '验证码通过'
      }
    }
    return {
      code: -1,
      msg: '验证码不对啊,再仔细看看'
    }
  }

  @Post('login')
  login(@Body() body) {
    const { username, password } = body;
    return this.userService.login(username, password);
  }

  @Post('info')
  @UseGuards(UserGuard)
  guardTovalidateAuthorization() { 
    return {
      name: 'zhangsan',
      age: 18
    }
  }

  @Post('info2')
  @UseGuards(UserGuard2)
  guardAndMiddlwareToValidateAuthorization(@Req() req) { 
    return req.user;
  }
}
