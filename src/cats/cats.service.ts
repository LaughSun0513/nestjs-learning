import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  create(createCatDto: CreateCatDto) {
    return {
      ...createCatDto
    };
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `1111This action returns a #${id} cat`;
  }

}
