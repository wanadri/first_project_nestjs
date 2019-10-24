import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceModule } from './devices/devices.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    DeviceModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
