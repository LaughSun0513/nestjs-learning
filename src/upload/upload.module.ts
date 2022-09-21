import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const uploadImg = MulterModule.register({
  storage: diskStorage({
    destination: join(__dirname, '../images'),
    filename: (req, file, callback) => {
      console.log(file);
      /*
      {
        fieldname: 'file',
        originalname: '10e0fbaeef65ca14aaf43d0c8.png',
        encoding: '7bit',
        mimetype: 'image/png'
      }
      */
      // extname(file.originalname) ==> .png 获取到文件的后缀
      const fileName = `${Date.now() + extname(file.originalname)}`;
      return callback(null, fileName);
    }
  })
})
@Module({
  imports: [uploadImg],
  controllers: [UploadController]
})
export class UploadModule {}
