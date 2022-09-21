## Nest.js
- 前置知识
    - 什么是依赖注入  
    - 什么是装饰器? 有哪些装饰器？
      - class装饰器 / 属性装饰器 / 方法装饰器 / 参数装饰器
- 怎么初始化 
  - nest命令的使用
  - nest new xxx
- 怎么创建路由 controller
- 怎么创建服务 service / providers
- 怎么创建过滤器 filters
- 怎么写接口
    - get
    - post
      - 怎么生成SSL证书
    - 获取请求的参数
    - 怎么测试接口
- 怎么设置session
  - 小案例:怎么添加验证码 
- 什么是中间件
- 怎么连接数据库
- 怎么增删改查

# 参考资料
https://blog.csdn.net/qq1195566313/category_11844396.html

### 怎么初始化
#### nest命令的使用
- nest g application xxx 生成一个项目目录
- nest g co xxx
- nest g co xxx --no-spec 不要测试用例文件 也可以在nest-cli里面配置generateOptions.spec=false
- nest g res xxx
- nest g cl xxx
- nest g config xxx
- nest g d xxx
- nest g f xxx
- nest g ga xxx
- nest g gu xxx
- nest g itc xxx
- nest g itf xxx
- nest g mi xxx
- nest g mo xxx
- nest g pipe xxx
- nest g r xxx

```bash
nest g cl aaa
CREATE src/aaa.ts (20 bytes)
    
nest g config aaa
CREATE undefined/nest-cli.json (118 bytes)
    
nest g d aaa     
CREATE src/aaa.decorator.ts (115 bytes)
    
nest g f aaa
CREATE src/aaa.filter.ts (185 bytes)
    
nest g ga aaa
CREATE src/aaa.gateway.ts (237 bytes)
UPDATE src/app.module.ts (378 bytes)
    
nest g gu aaa
CREATE src/aaa.guard.ts (298 bytes)
    
nest g itc aaa
CREATE src/aaa.interceptor.ts (309 bytes)
    
nest g itf aaa
CREATE src/aaa.interface.ts (24 bytes)
    
nest g mi aaa 
CREATE src/aaa.middleware.ts (195 bytes)
    
nest g mo aaa
CREATE src/aaa/aaa.module.ts (80 bytes)
UPDATE src/app.module.ts (433 bytes)
    
nest g pipe aaa
CREATE src/aaa.pipe.ts (219 bytes)
    
nest g pr aaa  
Error: A merge conflicted on path "/src/aaa.ts".
Failed to execute command: node @nestjs/schematics:provider --name=aaa --no-dry-run --no-skip-import --language="ts" --source-root="src" --no-spec
    
nest g r aaa 
CREATE src/aaa/aaa.resolver.ts (85 bytes)
UPDATE src/aaa/aaa.module.ts (154 bytes)
    
nest g s aaa
CREATE src/aaa/aaa.service.ts (87 bytes)
UPDATE src/aaa/aaa.module.ts (210 bytes)
    
nest g lib aaa
? What prefix would you like to use for the library (default: @app)? 
CREATE libs/aaa/tsconfig.lib.json (217 bytes)
CREATE libs/aaa/src/index.ts (61 bytes)
CREATE libs/aaa/src/aaa.module.ts (177 bytes)
CREATE libs/aaa/src/aaa.service.spec.ts (439 bytes)
CREATE libs/aaa/src/aaa.service.ts (87 bytes)
UPDATE nest-cli.json (454 bytes)
UPDATE package.json (2222 bytes)
UPDATE test/jest-e2e.json (324 bytes)
UPDATE tsconfig.json (674 bytes)
    
nest g app aaa
Error: Project "aaa" exists in this workspace already.
Failed to execute command: node @nestjs/schematics:sub-app --name=aaa --no-dry-run --no-skip-import --language="ts" --source-root="src" --no-spec
    
nest g res aaa
? Which project would you like to generate to? src [ Default ]
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
CREATE src/aaa/aaa.controller.ts (862 bytes)
CREATE src/aaa/aaa.module.ts (233 bytes)
CREATE src/aaa/aaa.service.ts (593 bytes)
CREATE src/aaa/dto/create-aaa.dto.ts (29 bytes)
CREATE src/aaa/dto/update-aaa.dto.ts (160 bytes)
CREATE src/aaa/entities/aaa.entity.ts (20 bytes)
```

#### 怎么测试接口
- curl -X GET xxx / curl -X POST xxx
  - https://www.jianshu.com/p/480617863951
  - curl http://localhost:3000/cats | python -m json.tool 格式化输出
  - curl http://localhost:3000/cats -s | json 前提是全局安装json工具 npm i json -g

- 使用工具httpie https://zhuanlan.zhihu.com/p/45093545
- vscode插件 rest client
- postman
- Apifox

## @Module
- 基础模块 imports/controllers/providers
- 共享模块 exports  可以把自己的service导出给别的controller里使用
- 全局模块 @Global() 直接导出service，不需要在module文件里imports，直接在controller里使用
- 动态模块 为了给模块传递参数 可以给该模块添加一个静态方法 用来接受参数

#### 共享模块 导入导出
```js
// xxx.module.ts
@Module({
  imports: [AModule,BModule....] // 导入模块
  controllers: [AController],
  providers:[AService, BService],
  exports: [AService], // 共享模块 ，导出
}
```
```js
// xxx.module.ts
@Module({
  imports: [AModule] // 导入模块
}
// xx.controller.ts
import { aService } from './xxx/a.service';
export class AaaController {
  constructor(
    private readonly aaaService:AaaService
    private readonly aService:aService // 导入共享模块来用
  ){}
}
```

#### 全局模块
```js
@Global() // 全局模块 使用AService的时候不用在module里面导入了
@Module({
  controllers: [AController],
  providers:[AService, BService],
  exports: [AService], // 共享模块 ，导出
}
// xx.controller.ts
import { aService } from './xxx/a.service';
export class AaaController {
  constructor(
    private readonly aaaService:AaaService
    private readonly aService:aService // 导入共享模块来用
  ){}
}
```
#### 动态模块
写一个自己的module配置，静态方法导出
为了给模块传递参数 可以给该模块添加一个静态方法 用来接受参数
```js
import { DynamicModule, Module, Global } from '@nestjs/common';

interface Options { 
    path: string;
}
@Global()
@Module({})
export class ConfigModule {
    static forRoot(options: Options): DynamicModule {
       // 这里相当于是拦截了一层，给所有的path前面加一个/api，然后导出
        const pathProvider = {
            provide: 'Config',
            useValue: {
                baseApi: '/api'+ options.path
            }
        }
        return {
            module: ConfigModule,
            providers: [pathProvider],
            exports: [pathProvider]
        }
    }
}
```
```js
// app.module.ts
// ...
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ path: '/zhangsan' })
  ]
})
export class AppModule {}

// app.controller.ts 这里面使用定义的Config
@Controller()
export class AppController {
  constructor(
    @Inject('Config') private readonly config: any //导入进来
  ) { }

  @Get()
  getHello() {
    return this.config; // 将useValue的对象返回出去 就是这个 {baseApi: '/api'+ options.path}
  }
}
```



### 怎么创建服务 providers/ service
providers里面有很多provide
provide提供值有几种方法
- useClass
- useValue
- useFactory同步/异步
```js
@Module({
  // providers: [CatsService], // useClass的语法糖简写
  providers: [
    {
      provide: 'CatsService111',
      useClass: CatsService
    },
    {
      provide: 'lalala',
      useValue: [1,2,3]
    },
    {
      provide: 'CatsService23',
      inject: [CatsService2],
      useFactory(CatsService2: CatsService2) {
        return '利用useFactory，CatsService3依赖CatsService2'
        // return new CatsService3(CatsService2)
      }
    },
    {
      provide: "sync",
      async useFactory() {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('useFactory返回一个promise或者其他异步操作')
          }, 3000)
        })
      }
    }
  ]
})
```

### 怎么写接口 controller
##### 获取请求的参数
- @Request
- @Param
- @Query
- @Body
- @Headers
- @Response
- @Next
- @HttpCode
- @Session

#### get请求
#### post请求
##### 怎么生成SSL证书
- 1.生成key   openssl genrsa -des3 -out server.key 2048
- 2.生成ca文件 openssl req -new -x509 -key server.key -out ca.crt -days 3650
- 3.生成CSR证书签名请求 openssl req -new -key server.key -out server.csr
- 4.生成crt文件 openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
- 5.合并证书    cat server.key server.crt > server.pem



### 怎么设置session
```
pnpm i express-session --save
pnpm i @types/express-session -D
```

```ts
// main.ts
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 
  app.use(session({
    secret: 'zhangsan', // 生成服务端session签名, 塞一点自己的字符串内容生成一个cookie的value值
    name: '我是cookie的名字', // 生成客户端cookie 的名字
    rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间默认false
    cookie: { // 默认配置
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge:null
    }
  }));
  // ...
}
```
#### 写一个小案例生成session
引入验证码的一个包，在服务端引入之后，返回一个svg给前端
然后这个包会生成一个text注入进session，拿到服务端来验证，这样就知道是不是匹配的

```
npm install svgCaptcha -S
```
```js
// ...
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
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
}
```
```vue
<template>
<el-form-item label="验证码">
  <div style="display:flex">
        <el-input  v-model="form.code" />
        <img @click="resetCode" :src="codeUrl" alt="">
  </div>
</el-form-item>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  code: ''
});
// 前端加上返回的svg验证码图片
const codeUrl = ref<string>('/api/user/captcha');
// 刷新
const resetCode = () => codeUrl.value + '?' + Math.random();

// 把验证码提交到服务器
const onSubmit = async () => { 
  await fetch('/api/user/create', {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
              'content-type': 'application/json'
          }
    }).then(res => res.json())
}
</script>
```

验证码验证
```js
// http://localhost:3000/user/create
  @Post('create')
  createUser(@Req() req, @Body() body) {
    const { code } = body;
    const session = req.session.captcha;
    if (session.toLocaleLowerCase() === code.toLocaleLowerCase()) {  // 然后等客户端传过来再验证是不是一个验证码
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
```

## 什么是中间件
中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象

中间件函数可以执行以下任务:

- 运行过程中执行任意代码
- 对请求和响应进行更改
- 结束本次请求的响应
- 继续调用下一个中间件
- 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起

### 编写中间件
```
nest g mi logger
```

使用`@Injectable()`来装饰中间件，被装饰的对象应该实现`NestMiddleware`接口
```ts
// middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我是LoggerMiddleware中间件===>' + `${req.method} ${req.path}`);
    next();
  }
}
```

怎么用中间件呢？

#### 场景一 针对所有的cats接口生效中间件
```ts
// cats.module.ts
import { LoggerMiddleware } from '~/middleware/logger.middleware';

// 在模块里面 实现 configure 返回一个消费者  consumer 通过 apply 注册中间件 通过forRoutes 指定  Controller 路由
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```

#### 场景二  拦截某个方法生效
针对请求方法应用中间件
只对特定的请求方法，比如GET请求才应用中间件
```ts
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: 'cats',
        method: RequestMethod.GET
      });
  }
}
```

#### 应用多个中间件
```ts
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware,middleware1,middleware2...)
      .forRoutes({
        path: 'cats',
        method: RequestMethod.GET
      });
  }
}
```

#### 场景三 路由地址有变化，而中间件这里没有跟着改掉，就会导致问题,直接放控制器
```ts
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
```

#### 排除指定路由
有些场景下对控制器应用了中间件之后需要绕过其中几个方法，比如登录验证中间件应该放行登录路由，否则没有人能够登录成功。
```ts
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        path: 'user/login',
        method:RequestMethod.GET
      })
      .forRoutes(CatsController);
  }
}
```

### 全局中间件
- 全局注册，对每一个路由都生效
- 注意全局中间件只能使用函数模式
- 案例可以做白名单黑名单之类的

```ts
// main.ts
const globalMiddleware = (req, res, next) => { 
  const whitelist = ['/cats'];
  console.log('全局的中间件函数', req.originalUrl);

  if (whitelist.includes(req.originalUrl)) {
    next();
  }
  else { 
    res.send('你是黑名单')
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware);
  await app.listen(3000);
}
bootstrap();

// 访问 http://localhost:3000/list 就是黑名单
// 访问 http://localhost:3000/cats 就可以正常返回
```

### 第三方中间件 别人写的包
比如cors处理跨域

```bash
pnpm install cors
pnpm install @types/cors -D
```

```ts
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //...
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
```

浏览器控制台测一下
```
fetch('http://localhost:3000/cats')
.then(res=>res.json())
.then(res=> console.log(res));
```

## 需求: 上传图片
依赖
- pnpm install multer @types/multer
- @nestjs/platform-express 自带


使用
```ts
// upload.module.ts
// ...
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

// 定义上传的模块
const uploadImg = MulterModule.register({
  storage: diskStorage({
    destination: join(__dirname, '../images'), // 这个会在dist下面自动生成一个images静态目录
    filename: (req, file, callback) => {
      console.log(file);
      /*
      {
        fieldname: 'file',
        originalname: '10e0fbaeef65ca14aaf43d0c8.png',
        encoding: '7bit',
        mimetype: 'image/png'
      }
      */
      // extname(file.originalname) ==> .png 获取到文件的后缀
      const fileName = `${Date.now() + extname(file.originalname)}`; // 按时间戳给图片取个名字，比如1663745192599.png
      return callback(null, fileName);
    }
  })
})
@Module({
  imports: [uploadImg],
})
export class UploadModule {}
```

```ts
// upload.controller.ts
import { UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {

  @Post('imgs')
  // 上传单个文件
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@UploadedFile() file) { 
    console.log('upload===>', file)
    /*
    {
      fieldname: 'file',
      originalname: '10e0fbaeef65ca14aaf43d0c8.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: '/Users/.../dist/images',
      filename: '.png1663744808703',
      path: '/Users/.../dist/images/.png1663744808703',
      size: 69322
    }
    */
    return '你小子可以啊,竟然会使用nest上传图片了';
  }
}
```

使用apifox http://localhost:3000/upload/imgs  
post请求 + body里面选择参数file点击上传文件 发送即可收到文件对象

最终会上传到dist下面，如果想访问静态的图片，我们这边还要给它加一个假的目录名字
```ts
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // 这里必须加上NestExpressApplication不然没有useStaticAssets方法
  // ...
  app.useStaticAssets(join(__dirname, 'images'), {prefix: '/imgs'}); // 相当于用户访问了imgs的路径，给它一个假目录，实际去的是images目录
  // ...
}
bootstrap();

// 然后访问 http://localhost:3000/imgs/1663745192599.png 就可以访问到这张图片了
```
