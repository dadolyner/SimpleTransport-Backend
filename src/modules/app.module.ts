import { Module } from '@nestjs/common';
import { TypeOrmConfig } from 'src/config/config.typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmConfig, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
