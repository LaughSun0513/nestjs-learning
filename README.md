## Nest.js
- 前置知识
    - 什么是依赖注入  
    - 什么是装饰器? 有哪些装饰器？
      - class装饰器 / 属性装饰器 / 方法装饰器 / 参数装饰器
- 怎么初始化 
  - nest new xxx
- 怎么创建路由
- 怎么写接口
    - get
    - post
      - 怎么生成SSL证书
    - 获取请求的参数
    - 怎么测试接口 
        
- 怎么连接数据库
- 怎么增删改查
- nest命令的使用


#### 怎么测试接口
- curl -X GET xxx / curl -X POST xxx
  - https://www.jianshu.com/p/480617863951
  - curl http://localhost:3000/cats | python -m json.tool 格式化输出
  - curl http://localhost:3000/cats -s | json 前提是全局安装json工具 npm i json -g

- 使用工具httpie https://zhuanlan.zhihu.com/p/45093545
- vscode插件 rest client
- postman

#### 怎么生成SSL证书
- 1.生成key   openssl genrsa -des3 -out server.key 2048
- 2.生成ca文件 openssl req -new -x509 -key server.key -out ca.crt -days 3650
- 3.生成CSR证书签名请求 openssl req -new -key server.key -out server.csr
- 4.生成crt文件 openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
- 5.合并证书    cat server.key server.crt > server.pem

#### 获取请求的参数
- @Request
- @Param
- @Query
- @Body
- @Headers
- @Response
- @Next
- @HttpCode
- @Session

### nest命令的使用
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
