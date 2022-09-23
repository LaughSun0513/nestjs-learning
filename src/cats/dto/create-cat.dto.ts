// 对数据的一层包装，防止非法字段的提交和IDE自动提示
import {
    IsString,
    IsNumber,
    Length
} from 'class-validator';

export class CreateCatDto {
    @IsString()
    @Length(10, 20, { message: 'catName名字太长了不行' }) // 最短--最长
    readonly catName: string;

    @IsString()
    @Length(1, 3, { message: 'catAge名字太长了不行' })
    readonly catAge: string;
}
