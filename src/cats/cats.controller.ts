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
  Session
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
    return this.catsService.create(createCatDto);
  }

  // http://localhost:3000/cats
  @Get()
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
      session
    }
  }

  // http://localhost:3000/cats/1
  // @Get(':id')
  // findOne(@Param() params) {
  //   return this.catsService.findOne(+params.id);
  // }

  //http://localhost:3000/cats/1?name=123
  @Get(':id')
  findOne(@Req() req, @Res() res) {
  // findOne(@Request() req) {
    return {
      params: req.params,
      query: req.query,
      res
    }
  }

  //http://localhost:3000/cats/1?name=123
  // @Get(':id')
  // findOne(@Query() query) {

  //   return {
  //     query: query // {"name":"123"}
  //   }
  // }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return this.catsService.update(+id, updateCatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.catsService.remove(+id);
  // }
}
