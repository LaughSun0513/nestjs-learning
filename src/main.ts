import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { globalMiddleware } from './middleware/global.middleware';
import * as cors from 'cors';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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

  // app.use(globalMiddleware);
  app.use(cors());

  app.useStaticAssets(join(__dirname, 'images'), {prefix: '/imgs'});
  await app.listen(3000);
}
bootstrap();
