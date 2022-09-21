import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsService2 } from './cats.service2';
import { CatsService3 } from './cats.service3';
import { LoggerMiddleware } from '~/middleware/logger.middleware';

@Module({
  controllers: [CatsController],
  // providers: [CatsService]
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
      inject: [],
      useFactory() {
        return '1111'
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
/** 场景一 针对所有的cats接口生效
 *  在模块里面 实现 configure 返回一个消费者  consumer 通过 apply 注册中间件 通过forRoutes 指定  Controller 路由
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
*/

  
/** 场景二  拦截某个方法生效
  * 针对请求方法应用中间件 比如拦截GET  POST 等
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
*/
  
// 场景三  路由地址有变化，而中间件这里没有跟着改掉，就会导致问题
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        path: 'user/captcha',
        method:RequestMethod.GET
      })
      .forRoutes(CatsController);
  }
}
