import { Controller, Post, Get, Res, Body } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { success } from "src/lib/response";
import { UserDto } from "src/users/dto/user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly user: UserService) {}

  @Post('register')
  async register(@Body() user: UserDto, @Res() res) {
    const getUser = await this.user.create(user)
    return success(res, getUser)
  }
}