import { IsBoolean, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  nome: string;

  @IsString()
  email: string;

  @IsString()
  cpf: string;

  @IsString()
  fone: string;

  @IsString()
  celular: string;

  @IsBoolean()
  status: boolean;
}
