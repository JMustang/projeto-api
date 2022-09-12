import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { DatabaseModule } from 'src/database/database.module';
import { clienteProviders } from './client.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [...clienteProviders, ClientService],
})
export class ClientModule {}
