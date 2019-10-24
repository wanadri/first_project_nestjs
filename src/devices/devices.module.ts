import { Module } from '@nestjs/common';
import { DeviceService } from './devices.service';
import { DeviceController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './devices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Device',
      schema: DeviceSchema
    }]),
  ],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [
    DeviceService
  ]
})
export class DeviceModule {}
