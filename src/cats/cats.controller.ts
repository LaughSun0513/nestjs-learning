import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Request,
  Res,
  Response,
  Body,
  Param,
  Query,
  HttpCode,
  Headers,
  Ip,
  HostParam,
  Session,
  Logger,
  Inject,
  UsePipes,
  UseInterceptors
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsPipe } from './cats.pipe';
import { AppInterceptor } from '~/interceptor/app.interceptor';

@Controller('cats')
export class CatsController {
  constructor(
    @Inject('CatsService111') private readonly catsService: CatsService,
    @Inject('lalala') private arr: string[],
    @Inject('CatsService23') private readonly CatsService23:any
  ) { }

  @Post()
  @UsePipes(CatsPipe)
  create(@Body() createCatDto: CreateCatDto) {
    console.log('createCatDto', createCatDto)
    return createCatDto
  }

  // http://localhost:3000/cats
  @Get()
  @UseInterceptors(AppInterceptor)
  @HttpCode(202)
  findAll(
    @Ip() ip: string,
    @HostParam() hosts: string,
    @Headers() headers: string,
    @Body() body: any,
    @Query() query,
    @Session() session,
    @Param() params) {
    return {
      code: 202,
      ip,
      hosts,
      headers,
      body,
      query,
      params,
      session,
      arr: this.arr
    }
  }

  // http://localhost:3000/cats/1
  // @Get(':id')
  // findOne(@Param() params) {
  //   return this.catsService.findOne(+params.id);
  // }

  //http://localhost:3000/cats/1?name=123
  @Get(':id')
  findOne(@Req() req) {
  // findOne(@Request() req) {
    return {
      params: req.params,
      query: req.query
    }
  }

  
  //http://localhost:3000/cats/1?name=123
  // @Get(':id')
  // findOne(@Query() query) {
  //   return {
  //     query: query // {"name":"123"}
  //   }
  // }

}

