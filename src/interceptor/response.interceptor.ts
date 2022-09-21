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
