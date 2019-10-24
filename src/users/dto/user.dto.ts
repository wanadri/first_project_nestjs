import { IsString, IsEmail } from 'class-validator'

export class UserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  name: string  
}

export interface IUser {
  email: string,
  password: string,
  name: string,
  active?: boolean,
  token?: string[]
}