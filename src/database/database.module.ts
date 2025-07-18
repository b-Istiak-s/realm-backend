import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'billy1990',
      database: '3d_realm',
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      synchronize: true, // disable in production
    }),
  ],
})
export class DatabaseModule {}
