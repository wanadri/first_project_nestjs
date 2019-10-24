import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDto } from './dto/devices.dto'


@Injectable()
export class DeviceService {
  constructor(@InjectModel('Device') private readonly device: Model<any>) {}

  async create(deviceDto: DeviceDto) {
    return await this.device.create(deviceDto)
  }

  async getAll(): Promise<DeviceDto[]>  {
    return await this.device.find()
  }

  async getByCode(code: string): Promise<DeviceDto> {
    return await this.device.findOne({device_code: code})
  }
}
