import { Controller, Post, Get, Req, Res, Param, Query, Body, Delete, Patch } from "@nestjs/common";
import { DeviceService } from "./devices.service";
import { DeviceDto, IDevice } from "./dto/devices.dto";
import { success } from "../lib/response";

@Controller('devices')
export class DeviceController {
  constructor(private readonly device: DeviceService) {}

  @Get()
  async getDevices(@Res() res) {
    const devices: IDevice[] = await this.device.getAll();
    return success(res, devices);
  }

  @Get(':code')
  async getDevice(@Param('code') code: string, @Res() res) {
    const device: IDevice = await this.device.getByCode(code);
    return success(res, device);
  }

  @Post()
  async create(@Body() device: DeviceDto, @Res() res) {
    const successDevice: IDevice = await this.device.create(device);
    return success(res, successDevice, `Successful created with device code = ${successDevice.device_code}`);
  }

  @Delete(':code')
  async delete(@Param('code') code: string, @Res() res) {
    await this.device.delete(code)
    return success(res, null, `Successful delete device code = ${code}`)
  }

  @Patch()
  async update(@Body() device: DeviceDto, @Res() res) {
    await this.device.update(device);
    return success(res, null, `Successful update device code = ${device.device_code}`)
  }

  @Patch('/credential/:code')
  async generateCredential(@Param('code') code: string, @Res() res) {
    await this.device.generateCredential(code)
    const deviceCredential = await this.device.getByCode(code)
    return success(res, deviceCredential, `Successful generate credential for device code = ${code}`)
  }
}