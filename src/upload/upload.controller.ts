import { Controller, UseInterceptors, UploadedFile, Post, Get, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {

  @Post('imgs')
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@UploadedFile() file) { 
    console.log('upload===>', file)
    /*
    {
      fieldname: 'file',
      originalname: '10e0fbaeef65ca14aaf43d0c8.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: '/Users/.../dist/images',
      filename: '.png1663744808703',
      path: '/Users/.../dist/images/.png1663744808703',
      size: 69322
    }
    */
    return '你小子可以啊,竟然会使用nest上传图片了';
  }

  @Get('download')
  download(@Res() res) {
    // 理论上从数据库里去拿图片 这里测试直接写死
    const url = join(__dirname, '../images/1663745192599.png');
    res.download(url);
  }

  @Get('streamDownload')
  async streamDownload(@Res() res) { 
    const url = join(__dirname, '../images/1663745192599.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=zhangsan');
    tarStream.pipe(res);
  }
}
