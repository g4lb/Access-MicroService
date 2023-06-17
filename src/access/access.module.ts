import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { ApiKeyModule } from 'src/core/apiKey/api-key.module';

@Module({
  imports: [ApiKeyModule],
  providers: [AccessService],
  controllers: [AccessController],
})
export class AccessModule {}
