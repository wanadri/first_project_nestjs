import { Controller, Post, Get, Req, Res, Param } from "@nestjs/common";
import { DeviceService } from "./devices.service";
import { DeviceDto } from "./dto/devices.dto";

@Controller('devices')
export class DeviceController {
  constructor(private readonly device: DeviceService) {}

  @Get()
  async getDevices(): Promise<DeviceDto[]> {
    return await this.device.getAll();
  }

  @Get(':code')
  getDevice(@Param('code') code) {

  }

  @Post('')
  create(@Req() req, @Res() res) {

  }
}