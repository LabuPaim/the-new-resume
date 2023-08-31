<p align="center">
  <img src="public\img\labuPaim-SemFundo.png" width="200" alt="Nest Logo" />
</p>

<p align="center">
  <a href="https://docs.nestjs.com/" target="blank"><img src="public\img\nest.png" width="100" alt="Nest Logo" /></a>
  <a href="https://swagger.io/" target="blank"><img src="public\img\swagger.png" width="100" alt="Swagger Logo" /></a>
  <a href="https://www.typescriptlang.org/" target="blank"><img src="public\img\TS.png" width="100" alt="TypeScript Logo"/></a>
  <a href="https://nodejs.org/en/" target="blank"><img src="public\img\node.png" width="100"  alt="NodeJs Logo" /></a>
  <a href="https://insomnia.rest/" target="blank"><img src="public\img\insomnia.png" width="100"  alt="Insomnia Logo" /></a>

</p>

## Descrição

Back-end criado com [Nest](https://github.com/nestjs/nest) um framework com estrutura progressiva do Node.js com TypeScript do lado do servidor eficiente e escalável e documentação feita em Swagger.

## Comandos Utilizados

```bash
$ npm i -g @nestjs/cli
# Instala o NestJS Globalmente
```

```bash
$ nest new theNewResume
# Criação das dependências do NestJs onde o nome do projeto é "theNewResume"
```

```bash
$ yarn add @nestjs/swagger
# Instalação do Swagger para NestJs
```

```bash
$ yarn add prisma -D
# Instalação do Prisma para desenvolvimento
```

```bash
$ yarn add @prisma/client
# Instalação do client do prisma para build
```

```bash
$ npx prisma init
# Inicialização do schema do prisma
```

```bash
$ yarn add class-validator
# Instalação de lib para validação de dados
```

```bash
$ yarn add class-validator-cpf
# Instalação de lib para validação de cpf
```

```bash
$ yarn add @nestjs/passport
# Instalação de lib para validação de dados
```

```bash
$ nest g resource [nome] --no-spec
# Criação completa de arquitetura do CRUD
```

```bash
$ npx prisma generate
# Para gerar o prisma client e alterar o schema no NodeModule
```

```bash
$ npx prisma db push
# Para enviar a alteração para o banco de dados
```

```bash
$ npx prisma migrate dev --name User
# Criação da tabela no postgres sem resetar o DB
```

## Instalação

```bash
$ yarn
```

## Executando a aplicação

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Teste

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Suporte

Nest é um projeto de código aberto licenciado pelo MIT. Se quiser acessar a documentação é só [clicar aqui](https://docs.nestjs.com/).

## Contato

- Author - Victor Paim
- Linkedin - [@labupaim](https://www.linkedin.com/in/labupaim/)
- GitHub - [@LabuPaim](https://github.com/LabuPaim)
- WhatsApp - +55 (71) 9 8300-6611
