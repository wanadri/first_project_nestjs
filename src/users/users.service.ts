import { Injectable, HttpException, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly user: Model<any>) {}

  async getAll(): Promise<IUser[]>{
    return await this.user.find();
  }

  async getById(id: string): Promise<IUser> {
    const user = await this.user.findOne({_id: id})

    if (!user) {
      throw new HttpException({
        'status': 404,
        'error': true,
        'message': 'User not found'
      },404)
    }

    return user
  }

  async create(user: UserDto): Promise<IUser> {

    const isExist = await this.isEmailExist(user.email);
    if (isExist) {
      throw new ConflictException('Email already exist')
    }
    
    user.password = await bcrypt.hash(user.password, 10);

    return await this.user.create(user)
  }

  async isEmailExist(email: string) {
    const user = await this.user.findOne({email})
    if (!user) {
      return false
    }
    return true
  }

  async delete(id: string) {
    const isUserDelete = await this.user.deleteOne({_id: id})
    if (isUserDelete.deletedCount == 0) {
      throw new HttpException({
        'status': 404,
        'error': true,
        'message': 'User not found'
      }, 404)
    }
  }
}
