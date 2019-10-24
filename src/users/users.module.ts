import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from '../users/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Users',
    schema: UserSchema
  }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UsersModule {}
