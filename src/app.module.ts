import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    CatsModule,
    UserModule,
    ConfigModule.forRoot({ path: '/zhangsan' })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
