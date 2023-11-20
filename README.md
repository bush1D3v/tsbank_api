# ⛰️ TSBANK API
![License](https://img.shields.io/static/v1?label=license&message=MIT&color=yellow) &nbsp;
![Npm version](https://img.shields.io/static/v1?label=npm&message=v10.1.0&color=orange) &nbsp;
![Repository size](https://img.shields.io/github/repo-size/bush1D3v/tsbank_api?color=green) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=blue)

## 🔍 Sobre o Projeto
A **API TSBank** é uma aplicação **RESTful** que oferece suporte a operações **CRUD** simples, **gerenciamento** e **controle** de transações, geração de **extratos**, **saques**, **depósitos** e transações **entre contas**, além de ter a capacidade de atualizar **todas** as informações do usuário.

## 🛠️ Tecnologias e Ferramentas Utilizadas
<div>
    <img align='center' height='50' width='70' title='TypeScript' alt='typescript' src='https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg' />
    <img align='center' height='54' width='68' title='Node.js' alt='nodejs' src='https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg' />
    <img align='center' height='55' width='70' title='PostgreSQL' alt='postgresql' src='https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg' />
    <img align='center' height='54' width='68' title='Jest' alt='jest' src='https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg' /> &nbsp;
    <img align='center' height='49' width='49' title='Express' alt='express' src='https://github.com/bush1D3v/solid_rest_api/assets/133554156/ba645c20-1f19-4914-8ad0-de6c7f83ba2e' /> &nbsp; 
    <img align='center' height='53' width='49' title='Nodemon' alt='nodemon' src='https://github.com/bush1D3v/solid_rest_api/assets/133554156/fd586348-7781-4e02-a4f0-fe7410ef43fb' /> &nbsp;
    <img align='center' height='49' width='49' title='Dotenv' alt='dotenv' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/432ec521-c94a-4f24-964e-f62658d04581' /> &nbsp;
    <img align='center' height='53' width='55' title='JsonWebToken' alt='jsonwebtoken' src='https://github.com/bush1D3v/solid_rest_api/assets/133554156/d23ffb9d-aedc-4d68-9209-7268d7f41ce6' /> &nbsp;
    <img align='center' height='50' width='70' title='Cors' alt='cors' src='https://github.com/bush1D3v/tsbank_api/assets/133554156/f4aeef17-72c3-4b37-a45b-ee149f5b954d' /> &nbsp;
    <img align='center' height='48' width='48' title='Bcrypt' alt='bcrypt' src='https://github.com/bush1D3v/solid_rest_api/assets/133554156/5863bac1-a591-4776-82a4-f427681934be' /> &nbsp;
    <img align='center' height='48' width='48' title='Insomnia' alt='insomnia' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/75a3fffd-792e-4250-8ef5-2abb615e38a0' /> &nbsp;
    <img align='center' height='53' width='49' title='Beekeeper' alt='beekeeper' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/0d5b4b55-546c-4bc0-a25c-dfc9116fe993' /> &nbsp;
    <img align='center' height='50' width='50' title='Knex' alt='knex' src='https://github.com/bush1D3v/bank_restful_api/assets/133554156/428d135b-9aeb-46e2-b6f6-94791326ff2f' /> 
    <img align='center' height='60' width='70' title='Swagger' alt='swagger' src='https://github.com/bush1D3v/tsbank_api/assets/133554156/6739401f-d03b-47f8-b01f-88da2a9075d1' />
</div>

## 🏗 Estrutura e Arquitetura

O projeto segue os princípios da **arquitetura limpa** e leva em consideração os princípios do **SOLID**. O código foi organizado de acordo com os princípios de **modularidade**, **reutilização** e **responsabilidade única**.

## 🔏	Autenticação
Para usar a API, é **necessário** autenticar-se. Você deve obter um **token JWT válido** através do **endpoint de login** antes de acessar outros recursos. O token JWT deve ser incluído no **cabeçalho de autorização** de **todas** as solicitações subsequentes.

## 📃 Documentação da Aplicação
A seguir, temos o link da **documentação oficial** da nossa aplicação no **Swagger**: <br>
https://tsbank-api.onrender.com/
> obs: Pode ocorrer atraso no carregamento, pois se o deploy não for acessado por um certo período, uma requisição subsequente solicitará ao Render que a aplicação seja reativada.

# 🖋️ Contribuindo para a TSBank API

Agradecemos pelo seu interesse em contribuir para a **TSBank API**. Sua ajuda é **valiosa** para melhorar e **expandir** nossa aplicação. Abaixo estão as **diretrizes** e os **passos** para contribuir com nosso projeto.

## 💻 Como Contribuir

### 🌳 Forkando o Repositório
Antes de começar, você **deverá** forkar o repositório do projeto para **seu perfil**.

### 🖨 Clonando seu Repositório
Após o Fork, você **precisará** clonar o repositório forkado para seu **ambiente de desenvolvimento local**:

```
git clone https://github.com/{seu-usuario}/tsbank_api.git
cd tsbank_api
```

### ⏬ Instalando Dependências
Certifique-se de ter Node.js instalado no seu sistema. Em seguida, instale as dependências necessárias:

```
npm install
```
ou
```
yarn install
```

### 🆕 Criando uma Branch
Antes de iniciar qualquer trabalho, crie uma branch separada para a sua contribuição. Use um nome descritivo para a sua branch:

```
git checkout -b feature/nova-funcionalidade
```

### 🔨 Fazendo Alterações
Faça as alterações necessárias no código, adicione novos recursos ou correções de bugs.

### 🧪 Testando
Garanta que suas alterações não quebraram nenhum recurso existente. Execute os testes e certifique-se de que todos passam:

```
npm run test
```
ou
```
yarn test
```

### 📝 Documentando
Mantenha a documentação atualizada. Se você adicionou novos recursos, verifique se eles estão devidamente documentados no README.

### 📊 Compromissos e Push
Após concluir suas alterações e testá-las, faça um commit das alterações:
```
git add .
git commit -m feat(nomeDoArquivo): Nova funcionalidade
```

Em seguida, envie suas alterações para o repositório:

```
git push origin feature/nova-funcionalidade
```

### 📨 Solicitando um Pull Request (PR)

Vá para o repositório no GitHub e crie um Pull Request para que sua contribuição seja revisada. Certifique-se de descrever suas alterações e fornecer informações contextuais.

### 👁 Revisão e Fusão
Após criar um Pull Request, nossa equipe revisará suas alterações e fornecerá feedback. Uma vez aprovado, suas alterações serão mescladas no projeto principal.

## 💼 Diretrizes Gerais

- Mantenha o código limpo e legível.
- Siga as boas práticas de desenvolvimento.
- Respeite as convenções de nomenclatura existentes.
- Documente adequadamente as alterações, recursos ou correções.

#

***Agradecemos pela sua contribuição e esperamos trabalhar juntos para tornar a TSBank ainda melhor. Se você tiver alguma dúvida ou precisar de ajuda, não hesite em entrar em contato conosco. Juntos, podemos criar uma aplicação mais robusta e eficiente.***
