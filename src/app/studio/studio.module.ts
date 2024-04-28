import { Module } from '@nestjs/common';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';
import { Studio } from 'src/entities/studio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudioRepository } from './studio.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [StudioController],
  providers: [
    StudioService,
    {
      provide: 'StudioRepositoryInterface',
      useClass: StudioRepository,
    },
  ],
})
export class StudioModule {}
