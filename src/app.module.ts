import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceModule } from './devices/devices.module';
require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
