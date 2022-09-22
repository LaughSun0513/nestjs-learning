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
https://www.ddhigh.com/tags/nestjs/

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

## 需求: 下载图片
- 直接下载 res.download
- 文件流的方式下载

服务器端利用`pnpm install compressing`这个包,通过zip流的方式将图片压缩成xxx.zip
```ts
@Get('streamDownload')
  async streamDownload(@Res() res) { 
    const url = join(__dirname, '../images/1663745192599.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    // 设置下载的请求头
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=zhangsan');
    tarStream.pipe(res);
}
```
前端请求图片的buffer，利用a去模拟点击下载
```ts
const useFetch = async (url) => {
  const res = await fetch(url).then(res => res.arrayBuffer())
  console.log(res)
  
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([res],{
    // type:"image/png"
  }))
  a.download = 'zhangsan.zip';
  a.click()
}
const download = () => {
  useFetch('http://localhost:3000/upload/streamDownload')
}
download();
```

## 拦截器interceptor
拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发
- 在函数执行之前/之后绑定额外的逻辑
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数 (例如, 缓存目的)

### 可以让接口的返回json保持一个规范的输出
```json
{
  data, //数据
  code:0,
  message:"成功",
  success:true
}
```

```bash
nest g itc interceptor/response.ts
```

利用Rxjs的pipe管道来对数据进行处理
```ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface data<T> {
  data: T
}
@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
    return next.handle().pipe(map(data => { 
      // 拦截器 可以format输出的结果保持一个格式
      return {
        data,
        code: 0,
        success: true,
        message: '666'
      }
    }))
  }
}
```

在main.ts注册使用
```ts
import { ResponseInterceptor } from './interceptor/response.interceptor';

app.useGlobalInterceptors(new ResponseInterceptor());
```

访问 http://localhost:3000/cats

```json
{
    "data": {
        "code": 202,
        "ip": "::1",
        "hosts": {},
        "headers": {},
        "body": {},
        "query": {},
        "params": {},
        "session": {},
    },
    "code": 0,
    "success": true,
    "message": "666"
}
```

## 过滤器filter

让我们创建一个异常过滤器，它负责捕获作为HttpException类实例的异常，并为它们设置自定义响应逻辑。为此，我们需要访问底层平台 Request和 Response。我们将访问Request对象，以便提取原始 url并将其包含在日志信息中。我们将使用 Response.json()方法，使用 Response对象直接控制发送的响应

### 异常处理
#### 内置异常过滤器
```ts
import { HttpException, HttpStatus } from '@nestjs/common';
throw new HttpException('您无权登录', HttpStatus.FORBIDDEN);
```
#### 自定义异常
```ts
// 继承HttpException然后自己封装错误码/错误信息/状态码
// user.exception.ts
import { HttpException } from '@nestjs/common';
export class UserException extends HttpException {
    constructor(errcode: number, errmsg: string, statusCode:number) { 
        super({ errcode, errmsg }, statusCode);
    }
}
// user.service.ts
import { UserException } from './user.exception'
throw new UserException(40010, '您无权登录', HttpStatus.FORBIDDEN);
```

#### 自定义异常过滤器
```bash
nest g f filter/httpError
```

```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus();

    res.status(status).json({
      data: exception.message,
      time: new Date().getTime(),
      success: false,
      path: req.url,
      status
    })
  }
}
```

使用过滤器有三种作用范围,使用`@UseFilters`注册自定义异常过滤器

#### 方法级别
只会处理该方法上抛出的异常，其他方法抛出的异常不会处理
```ts
@Post('login')
@UseFilters(HttpErrorFilter)
login(@Body('username') username:string, password: string) {
  throw new UserException(40010, '您无权登录');
}
```
#### 控制器级别
只会处理该控制器方法上抛出的异常，其他控制器抛出的异常不处理
```ts
@Controller('user')
@UseFilters(HttpErrorFilter)
export class UserController {
  
}
```
#### 全局级别
在应用入口注册，不会对Websocket或者混合应用（同时支持两种应用，如HTTP/GRPC或者HTTP/WebSocket）生效。一般Web开发中全局异常过滤器已经够用了。
```ts
app.useGlobalFilters(new HttpErrorFilter());
```

访问一个没有的路径 http://localhost:3000/no
```ts
{
    "data": "Cannot GET /no",
    "time": 1663764545725,
    "success": false,
    "path": "/no",
    "status": 404
}
```

#### 捕获多种异常或者所有异常
如果有系统异常，会使用内置的异常处理器。通过传入异常类型给@Catch装饰器来捕获多种异常。如果不传任何异常类型的话，NestJs会捕获所有异常（也就是Error及其子类）
```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // 啥也不写，那就是捕获所有异常
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus();
    console.log('%s %s error: %s', req.method, req.url, exception.message);
    res.status(status).json({
      data: exception.message,
      time: new Date().getTime(),
      success: false,
      path: req.url,
      status
    })
  }
}
```

## 守卫guard
在访问指定的路由之前回调一个处理函数，如果该函数返回true或者调用了next()就会放行当前访问，否则阻断当前访问

### 创建路由守卫
通过继承CanActive接口即可定义一个路由守卫
`nest g gu xxx`

```ts
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class XxxGuard implements CanActivate {
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request | any>();

    // ...写逻辑
    
    return true
  }
}
```

### 使用路由守卫
路由守卫级别
 - 控制器级别
 - 方法级别
 - 全局级别

```ts
// 控制器级别
@Controller('user')
@UseGuards(UserGuard)
export class UserController {
  // 查看当前用户信息
  @Get('info')
  info() {
    return {username: 'fake_user'};
  }
}

// 方法级别
@Get('info')
@UseGuards(UserGuard)
info() {
  return {username: 'fake_user'};
}

// 全局级别
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 由于main.ts启动时并未初始化依赖注入容器，所以依赖必须手动传入，一般情况下不建议使用全局守卫，因为依赖注入得自己解决。
  app.useGlobalGuards(new UserGuard(new UserService()));
  await app.listen(3000);
}
bootstrap();
```


#### 路由守卫与中间件
> 区别： 路由守卫本质上也是中间件的一种，koa或者express开发中接口鉴权就是基于中间件开发的，如果当前请求是不被允许的，当前中间件将不会调用后续中间件，达到阻断请求的目的，但是中间件的职责是不明确的，中间件可以干任何事（数据校验，格式转化，响应体压缩等等），这导致只能通过名称来识别中间件，项目迭代比较久以后，有比较高的维护成本
> 由于单一职责的关系，路由守卫只能返回true和false来决定放行/阻断当前请求，不可以修改request/response对象，因为一旦破坏单一职责的原则，排查问题比较麻烦
> 如果需要修改request对象，可以结合中间件一起使用

> 路由守卫在所有中间件执行完毕之后开始执行
> 中间件 --> 路由守卫

#### 小例子: 路由守卫+中间件实现验证header里的参数authorization，然后返回user信息
`nest g mi middleware/auth`

```ts
// auth.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '~/user/user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }
  async use(req: Request | any, res: Response, next: () => void) {
    // 把authorization拿出来验证
    const token = req.header('authorization');
    console.log('token', token);
    if(!token) {
      next();
      return;
    }
    // 去 user.service.ts里面写getUserByToken
    const user = await this.userService.getUserByToken(token);
    if(!user) {
      next();
      return;
    }
    Logger.log('我是auth中间件,header里有Authorization才可以通过')
    // header上有authorization的值，那就把用户信息挂到req上，否则都没有user，说明不能通过
    req.user = user;
    next();
  }
}

// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async getUserByToken(token:string) { 
        if (token === 'lisi') { 
            return {
                name: 'lisi',
                age: 18
            }
        }
        return null;
    }
}
```

`nest g gu user2` 创建路由守卫

```ts
// user2.guard.ts
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
```
以上都是在定义中间件+定义路由守卫

使用中间件
```ts
// user.module.ts
import { AuthMiddleware } from '../middleware/auth.middleware';

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 注册中间件，不注册没法用
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
```

使用路由守卫
```ts
import { UseGuards } from '@nestjs/common';
import { UserGuard2 } from './user2.guard';

export class UserController {
  @Post('info2')
  @UseGuards(UserGuard2)
  guardAndMiddlwareToValidateAuthorization(@Req() req) { 
    return req.user;
  }
}
```

post请求 http://localhost:3000/user/info2 header里带Authorization=lisi
```json
{
    "data": {
        "name": "lisi",
        "age": 18
    },
    "code": 0,
    "success": true,
    "message": "666"
}
```

#### 小案例: 单独使用路由守卫实现header里Authorization的验证
nest g gu user

定义路由守卫
```ts
// user.guard.ts
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

// user.service.ts
@Injectable()
export class UserService {
    validateAuthorization(authorization: string) {
        // 这里去验证authorization 这里直接通过，校验逻辑可以自己写
        // 验证是不是zhangsan
        return true;
    }
}
```

使用路由守卫`@UseGuards(xxx)`
```ts
import { UseGuards } from '@nestjs/common';
import { UserGuard } from './user.guard';
// user.controller.ts
@Post('info')
@UseGuards(UserGuard)
guardTovalidateAuthorization() { 
  return {
    name: 'zhangsan',
    age: 18
  }
} 
```

post请求 http://localhost:3000/user/info header里带Authorization=zhangsan

#### 反射示例——基于角色的权限验证(RBAC)
定义角色装饰器
被角色装饰器装饰的控制器或者方法在访问时，路由守卫会读取当前用户的角色，与装饰器传入的角色相匹配，如果匹配失败，将阻断请求，否则将放行请求。

```ts
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

定义控制器
假设我们有一个只允许管理员访问的创建用户的接口：
```ts
@Post('create')
@Roles('admin')
async create(@Body() createUserDTO: CreateUserDTO) {
  this.userService.create(createUserDTO);
}
```
定义路由守卫
```ts
// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 获取roles元数据，roles与roles.decorator.ts中SetMetadata()第一个参数一致
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) { // 未被装饰器装饰，直接放行
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // 读取请求对象的user，该user对象可以通过中间件来设置（本文前面有例子）
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
```

#### 异常处理
路由守卫返回false时框架会抛出ForbiddenException，客户端收到的默认响应如下：
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```
如果需要抛出其他异常，比如UnauthorizedException，可以直接在路由守卫的canActive()方法中抛出。
另外，在这里抛出的异常时可以被异常过滤器捕获并且处理的，所以我们可以自定义异常类型以及输出自定义响应数据。