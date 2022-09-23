import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CatsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    console.log('pipe111===>', value, metatype); // { catName: 'xiaomiaomiao', catAge: '11' } [class CreateCatDto]
    // 如果不是注入的数据且不需要验证，直接跳过处理
    if (!metatype || !this.toValidate(metatype)) { 
      return value;
    }
    // 数据格式转换 
    const obj = plainToClass(metatype, value); // 请求传进来的body的参数是个普通对象，转成CreateCatDto的class的类型来校验
    console.log('pipe222===>', obj); //  CreateCatDto { catName: 'xiaomiaomiao', catAge: '11' }
    // 如果错误长度大于0，证明出错，需要抛出400错误
    const errors = await validate(obj);
    console.log('pipe333===>', errors);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }
  private toValidate(metatype): boolean { 
    const types = [String, Number, Boolean, Array, Object];
    return !types.includes(metatype);
  }
}
