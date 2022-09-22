import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
// @Catch() // 啥也不写，那就是捕获所有异常
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
