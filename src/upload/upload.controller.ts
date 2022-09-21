import { Controller, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
}
