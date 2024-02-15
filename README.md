<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://media.licdn.com/dms/image/C4D0BAQEVgJN8qra9nQ/company-logo_200_200/0/1630458807937?e=1715817600&v=beta&t=nmYFMk7VfyEf6ha1h_eenFrHv2Lha-YSGlxTuzPngjE" width="200" alt="Brain-ag logo" /></a>
</p>

---

### Descrição

Este projeto é a minha proposta de solução a um desafio da <a href="https://brain.agr.br/">Brain-ag</a>, desafio esse proposto por eles em uma vaga de Desenvolvedor(a) Back-end Node, onde o desafio em sua descrição consiste basicamente em criar/implementar uma api em Node, para gerenciar o registro de fazendas, desde realizar o CRUD (criar, listar e deletar) dos registros e criar 5 retornos para dashboards (Total de fazendas em quantidade, total de fazendas em hectares (área total), relação de fazendas por Estado, área aproveitada do uso do solo (área agricultável e de vegetação) e relação de culturas plantadas).

### Tecnologias utilizadas no projeto

- NodeJs
- ExpressJs
- NestJs
- TypeORM
- Docker e docker-compose
- PostgreSQL
- Swagger
- Class Transformer e Class Validator
- Typescript
- Entre outros

---

### Arquitetura

Para a implementação do projeto utilizei Nodejs em conjunto com o framewok Nestjs, Prisma como ORM para o banco de dados, no qual utilizei para persistir os dados o PostgreSQL, todo o projeto foi implementado utilizando Typescript.

A arquitetura do projeto está basicamente focada dentro da pasta src, a baixo segue a estrutura de pastas do projeto bem como a organização dos arquivos do mesmo:

```
src
    - - modules // Pasta que contém todos os modulos dessa aplicação
    - - prisma  // Pasta que contém a configuração de comunicação do prisma e a criação do prisma service
    - - test    // Pasta que contém os testes unitários do projeto
    - - utils   // Pasta que contém funções que utilizei em diferentes partes da construção do projeto
    app.module
    main.ts
```

Analisando a pasta <i>src/modules</i> em especifico:

```
modules
  - - dashboard  // Pasta que contem o retorno dos dados para usar no dashboard
  - - register   // Pasta que contem os serviços básicos da API como criar, modificar e deletar
```

De forma estrutural, esse módulos possuem algumas mudanças na forma como eu as orginezei, proveniente de como eu pensei em criar cada módulo, para que suas regras de negócios fossem atendidas. Abaixo irei explicar superficialmente cada modulo:

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
dashboard
  - - endpoints                        // Pasta que contém todos os arquivos que irão retornar os dados para os dashboards, utilizei essa pasta como um Services ou Use cases, apenas achei o nome mais fácil para que alguém externo possa compreender melhor
        - example-dashboard.service.ts // Arquivo Typescript que irá realizar a ação de criar o serviço desejado seguindo as boas práticas e regras de negócio desejadas.
  - - infra                            // Pasta responsável por abrigar a parte de infraestrutura do módulo. Onde contém as definições do traceamento das requisições HTTP assim como a parte de configuração das entidades do módulo
    - - http                           // Pasta que armazena o controller do serviço
        - example.controller.ts        // Controlador do módulo, responsável por receber as requisições HTTP e as endereçar para o seu devido serviço e retornar ao requisitante o resultado da operação do serviço.
  example.module.ts                    // Arquivo que configura tudo que tem/é utilizado no módulo, como os serviços, controladores do módulo, bem como as entidades com as quais o mesmo irá trabalhar. Bem como as definições de quais de suas funcionalidades outros módulos da aplicação podem ou não utilizar.
</pre>

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
register
  - - dto                             // Pasta que contém todas as definições das DTOs (Data Transfer Object) do projeto, podendo ser as DTOs contratos/interfaces ou classes propriamente ditas, com foco em tipar um dado, seja o mesmo de entrada ou saída.
          - exampleDTO.ts             // Arquivos Typescript que define uma DTO dentro do dado módulo, definição essa sendo feita com classes
  - - infra                           // Pasta responsável por abrigar a parte de infraestrutura do módulo. Onde contém as definições do traceamento das requisições HTTP assim como a parte de configuração das entidades do módulo
    - - http                          // Pasta que armazena o controller do serviço
          - example.controller.ts     // Controlador do módulo, responsável por receber as requisições HTTP e as endereçar para o seu devido serviço e retornar ao requisitante o resultado da operação do serviço.
  - - service                         // Pasta que armazena todos os serviços da aplicação, é nela que recebemos os dados coletados do controller e aplicamos as regras de negócios
          - example.service.ts        // Arquivo Typescript que ira realizar a ação de criar o serviço desejado seguindo as boas praticas e regras de negócio desejadas.
  example.module.ts                   // Arquivo que configura tudo que tem/é utilizado no módulo, como os serviços, controladores do módulo, bem como as entidades com as quais o mesmo irá trabalhar. Bem como as definições de quais de suas funcionalidades outros módulos da aplicação podem ou não utilizar.
</pre>

Agora podemos analisar a pasta <i>src/prisma</i> em especifico:

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
prisma
        - index.ts            // Arquivo que contem a instanciação do prismaClient, na qual trabalha como ORM e permite a comunicação de forma mais facil com o banco de dados, utilizando-o para funções basicas de um crud como funções mais avançadas.
        - prisma.service.ts   // Arquivo que contem a instanciação do PrismaService, que trabalha de maneira parecida com o prismaCliente mas requer alguns pré - requisitos para poder utilizá-lo em alguma classe.
</pre>

Agora podemos analisar a pasta <i>src/test</i> em especifico:

```
test
  - - unit
    - - dasboard
    - - register
```

A pasta test é responsável por abrigar os testes unitários dos modulos register e dashboard, ambos com estruturas iguais, o que muda é apenas as regras de negócios aplicadas em cada teste.

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
unit
  - - nome do módulo de testes          // Pasta que contém os as pastas dos modulos da API para realizar-los de maneira separada e organizada
    - - mocks                           // Contém arquivos ou módulos que simulam o comportamento de outras partes do sistema durante os testes
        - exampleMock.ts                // Arquivo que vai conter um falso teste, e um modulo que vai mockar as funções que o prisma oferece ( findUnique, findMany, count e etc).
    example.spec.ts                     // Arquivo que irá ser lido pelo jest e efetuará os testes.

</pre>

Por fim iremos analisar agora a pasta <i>src/utils</i>:

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
utils
  - - functions         // Pasta que armazena funções que serão utilizada em mais de um lugar do código, dessa forma facilitando o uso da mesma e melhorando a performace da API
        - example-function.ts // Arquivo que irá exportar uma função espeficica 
</pre>
