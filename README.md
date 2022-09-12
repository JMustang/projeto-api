<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

Fonte: [Nestjs](https://docs.nestjs.com/recipes/sql-typeorm) docs.

Link para a documentacao do [Swagger](https://docs.nestjs.com/openapi/introduction).

  
  ## PASSO A PASSO, ALGUNS COMANDOS BASICOS.

## Instalando o npm e o nestjs cli
```bash
npm install -g npm
npm insta```ll -g @nestjs/cli
```
## criando o projeto
```bash
nest new nome_do_projecto
```
## rodar em modo dev
```bash
npm run start:dev
```
## instalando container docker mysql
```bash
docker run --name nome_container -e MYSQL_ROOT_PASSWORD=senha_aqui -d mysql:latest
```

## rodando o container
```bash
docker start id_container
```
## instalando typeorm para mysql
```bash
npm install --save typeorm mysql2
```

## instalando o swagger
```bash
npm install --save @nestjs/swagger
```
## incluindo o swagger no main.ts
```bash
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
```

## gerando seu primeiro CRUD sem os arquivos de testes
```bash
nest g resource cliente --no-spec
```
**--no-spec** cria um crud sem os arquivos de testes.

## crie uma pasta database no src e inclua os arquivos com os seguintes conteúdos
```bash
Nome do aarquivo: database.module.ts
conteúdo:
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

Nome do aarquivo: database.providers.ts
conteúdo:
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}',],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
```
## crie um provider no seu crud conforme abaixo:
```bash
file: cliente.providers.ts
conteúdo:
import { DataSource } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

export const clienteProviders = [
  {
    provide: 'CLIENTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cliente),
    inject: ['DATA_SOURCE'],
  },
];
```

## altere o service do crud conforme abaixo:
```bash
// inclua o construtor
constructor(
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
  ) {}

// create
return this.clienteRepository.save(createClienteDto);

// findAll 
return this.clienteRepository.find();

// findOne
return this.clienteRepository.findOne({ where: { id } });

// update
return this.clienteRepository.update(id, updateClienteDto);

// delete
return this.clienteRepository.delete(id);
```
## Alteracoes no client module

```bash
imports: [DatabaseModule],
providers: [...clienteProviders,ClienteService,]
```
## na entidade inclua os campos da tabela conforme abaixo:
```bash
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
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
```
## no createdto e updatedto altere:
```bash
import { IsBoolean, IsString } from 'class-validator';

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
```
****