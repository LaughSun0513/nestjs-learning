import { DynamicModule, Module, Global } from '@nestjs/common';

interface Options { 
    path: string;
}
// 全局模块
@Global()
@Module({})
export class ConfigModule {
    static forRoot(options: Options): DynamicModule {
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