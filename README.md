# :soccer: Trybe Futebol Clube :soccer: 

Bem vindo ao repositório do projeto Trybe Futebol Club (TFC). Projeto que foi desenvolvido no modulo de backend na trybe, neste projeto foi desenvolvido uma tabela de classificação de times em relação a um campeonato, semelhante a tabela do brasileirão, sendo possivel editar resultado de partidas e finaliza-las. 

## Ferramentas, linguagens e bibliotecas
- TypeScript
- Docker
- Node.js
- MySQL
- Sequelize
- Express.js
- JWT(Autenticação)
- bcrypt.js
- Mocha
- Chai

## Habilidades utilizadas no Projeto
- Docker, utilizando docker compose;
- Modelagem de banco de dados MySQL utilizando Sequelize;
- Desenvolvimento de API seguindo os padrões REST;
- Orientação a objetos e padrão S.O.L.I.D;
- Implementação de testes de Integração;

### O que foi desenvolvido na API:

Todo o frontend foi desenvolvido pela Trybe e disponibilizado, a responsabilidade dos alunos ficou em desenvolver o backend, abaixo algumas dessas responsabilidades:

- Autenticação e autorização de usuário;
- Consulta de times cadastrados;
- Cadastro de partidas;
- Edição de partidas;
- Consulta de partidas;
- Consulta de tabela atualizada do campeonato

# Rodando o Projeto 

<details>

<summary><strong>Rodando o projeto com Docker ou localmente</strong></summary><br />

### Rodando em contêineres
dentro da raiz da aplicação, rode: 
```shell
npm run compose:up
``` 
ou
 ```shell
 npm run compose:up:dev
```
para rodar em desenvolvimento
### Rodando localmente
para iniciar o backend acesse `app/backend/`
atualize o arquivo `.env.example` para `.env` e edite as variáveis de acordo com o acesso ao seu banco de dados local.
Depois, rode:
```shell
npm run prestart && npm run start
```
ou 
```shell
npm run predev && npm run dev
```
para rodar em desenvolvimento.
para iniciar o frontend acesse `app/frontend/` e rode:
```shell
npm run start
```
</details>

  ## Editando Partidas
  
<details>

<summary><strong>Editando finalizando ou adicionando partidas</strong></summary><br />

  Para fazer alterações é necessario fazer login com um usuario que tem permissões de administrador, para isso faça login com os respectivos login e senha:

  ```json
  {
    "Login": "admin@admin.com",
    "Senha": "secret_admin"
  }
```
</details>