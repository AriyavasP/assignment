import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        },
    ],
})
export class UserModule { }