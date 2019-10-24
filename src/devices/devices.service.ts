import { Injectable, InternalServerErrorException, HttpException, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDto, IDevice } from './dto/devices.dto'
import { randomBytes } from 'crypto'
const uuidv1 = require('uuid/v1');


@Injectable()
export class DeviceService {
  constructor(@InjectModel('Device') private readonly device: Model<any>) {}

  async create(deviceDto: DeviceDto) {
    const device =  await this.device.create(deviceDto)
    if (!device) {
      throw new InternalServerErrorException
    }
    return device
  }

  async getAll(): Promise<IDevice[]>  {
    return await this.device.find()
  }

  async getByCode(code: string): Promise<IDevice> {
    return await this.device.findOne({device_code: code})
  }

  async generateCredential(code: string) {
    let clientId = uuidv1()
    let clientSecret = randomBytes(16).toString('hex')

    const isGenerated = await this.device.updateOne({
      device_code: code
    }, {
      credential: {
        client_id: clientId,
        client_secret: clientSecret
      }
    })
    
    if (isGenerated.n == 0) {
      throw new HttpException({
        'status': 404,
        'error': true,
        'message': 'Device code not found'
      }, 404)
    }
  }

  async delete(code: string) {
    const deletedDevice = await this.device.deleteOne({device_code: code})
    if (deletedDevice.deletedCount == 0) {
      throw new HttpException({
        'status': 404,
        'error': true,
        'message': 'Device not found'
      }, 404)
    }
  }

  async update(device: DeviceDto) {
    const isUpdated = await this.device.updateOne({
      device_code: device.device_code
    }, device)

    if (isUpdated.n == 0) {
      throw new HttpException({
        'status': 404,
        'error': true,
        'message': 'Device code not found'
      }, 404)
    }
  }

}
