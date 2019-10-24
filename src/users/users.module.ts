import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from '../users/users.schema';

const UserMongoose = MongooseModule.forFeature([{
  name: 'User',
  schema: UserSchema
}])
@Module({
  imports: [UserMongoose],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    UserMongoose,
    UserService
  ]
})
export class UserModule {}
