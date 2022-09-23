import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { format } from 'util';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  private readonly _logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // 请求开始时间

    return next.handle().pipe(tap(res => {
      const host = context.switchToHttp();
      const req = host.getRequest<Request>();

      this._logger.log(format(
        '%s %s %dms %s',
        req.method,
        req.url,
        Date.now() - start,
        JSON.stringify(res,null, 4)
      ));
    }));
  }
}
