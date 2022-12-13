import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'aluxion_api',
    entities: [__dirname + '/**/*.entity{.ts, .js}'],
    synchronize: true
  }), UsersModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
