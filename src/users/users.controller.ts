import { Controller, Get, Param, Res, Post, Body, Delete, Patch} from "@nestjs/common";
import { success } from "../lib/response";
import { UserService } from "./users.service";
import { UserDto } from "./dto/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly user: UserService) {}
  @Get()
  async getUsers(@Res() res) {
    const users = await this.user.getAll();
    return success(res, users)
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res) {
    const user = await this.user.getById(id);
    return success(res, user)
  }

  @Post()
  async create(@Body() user: UserDto, @Res() res) {
    const successUser = await this.user.create(user)
    return success(res, successUser)
  }

  @Delete(':id')
  async delete(@Param() id: string, @Res() res) {
    await this.user.delete(id)
    return success(res, null, `Successful delete user with id = ${id}`)
  }
}