# LojaProdutosApp

LojaProdutosApp é uma aplicação web desenvolvida em Angular que oferece uma interface completa para gerenciamento de **Produtos** e **Fornecedores**, com recursos adicionais como autenticação, controle de acesso por perfil e visualização de dados em dashboard.

## 📋 Funcionalidades

- ✅ CRUD completo de **Produtos**
- ✅ CRUD completo de **Fornecedores**
- ✅ Telas de consulta com **paginação**
- ✅ Dashboard com exibição de todos os **Fornecedores** e a **quantidade de Produtos** vinculados a cada um
- ✅ Sistema de **login**
- ✅ Controle de acesso com **dois perfis de usuário**:
  - **Administrador**: acesso completo a todos os recursos da aplicação
  - **Operador**: acesso restrito conforme regras definidas

## 🛠️ Tecnologias Utilizadas

- [Angular 19.1](https://angular.io/)
- TypeScript
- HTML5 + SCSS
- RxJS
- Angular Forms e Reactive Forms
- Angular Router
- Bootstrap

## 📋 Requisitos
- Node.js (versão LTS recomendada)
- npm ou yarn
- Angular CLI (opcional para desenvolvimento local)

## 🚀 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd LojaProdutosWeb
   ```
2. Instale dependências:
   ```bash
   npm install
   # ou
   yarn
   ```
3. Inicie em modo de desenvolvimento:
   ```bash
   npm run start
   # ou
   ng serve
   ```
   Aplicação disponível em http://localhost:4200

## 🛠️ Build para produção
```bash
npm run build
# ou
ng build --configuration production
```
