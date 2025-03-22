import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AdminModule,
  AuthModule,
  CategoryModule,
  StoreModule,
  UserModule,
} from './application';
import {
  RedisModuleCustom,
  DatabaseModule,
  MailModule,
  CustomJwtModule,
} from './infrastructure';
import { RolesModule } from './infrastructure/security/guards/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModuleCustom,
    DatabaseModule,
    MailModule,
    UserModule,
    AuthModule,
    AdminModule,
    RolesModule,
    CustomJwtModule,
    StoreModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
