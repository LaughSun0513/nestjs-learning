import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// 异常映射 利用RxJs的catchError来覆盖路由处理函数抛出的异常
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => throwError(new BadGatewayException()))
    );
  }
}
