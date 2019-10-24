import { IsNumberString, IsBoolean } from 'class-validator'

export class DeviceDto {
  @IsNumberString()  
  device_code: String
  @IsBoolean()
  active?: Boolean
  credential?: Object
}

export interface IDevice {
  device_code: String,
  active: Boolean,
  credential: Object
}