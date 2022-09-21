import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('Config') private readonly config: any
  ) { }

  @Get()
  getHello() {
    return this.config;
  }
}
