// export class Client {}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  fone: string;

  @Column({ length: 11 })
  celular: string;

  @Column()
  status: boolean;
}
