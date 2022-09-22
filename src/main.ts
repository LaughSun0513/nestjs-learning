import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import globalMiddleware from './middleware/global.middleware';
import * as cors from 'cors';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { ResponseInterceptor } from './interceptor/response.interceptor';
import { HttpErrorFilter } from './filter/httpError.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 添加session
  app.use(session({
    secret: 'zhangsan', // 生成服务端session 签名
    name: 'my-session', // 生成客户端cookie 的名字
    cookie: { // 默认配置
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: null
    },
    rolling: true // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间默认false
  }));

  app.use(globalMiddleware);
  app.use(cors());

  // 简称伪静态，访问的是imgs/xxx.png实际上访问的是dist/images/xxx.png
  app.useStaticAssets(join(__dirname, 'images'), { prefix: '/imgs' });
  
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(3000);
}
bootstrap();
