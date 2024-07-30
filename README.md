# Planejador de viagem (Front-end)

Projeto feito como desafio prático de desenvolvimento de software do Laboratório Nexus.

Tabela de conteúdos
=================  
<!--ts-->  

* [Sobre](#sobre)
* [Tecnologias](#tecnologias-e-ferramentas)
* [Pré-requisitos](#pré-requisitos)
* [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
* [Como Executar](#como-executar)

<!--te-->  

## Sobre

Este projeto tem como objetivo ajudar os usuários a planejar suas viagens de maneira eficiente e organizada. A aplicação permite que os usuários organizem atividades, criem links importantes, e organizem uma lista de itens para levar na viagem. A aplicação também conta com uma página de sugestão de destinos, gerada automaticamente pela [Google Places API](https://developers.google.com/maps/documentation/javascript/places) com base no destino do usuário.

### Tópicos escolhidos

* API RESTful para Gerenciamento de Recursos
* Autenticação e Autorização com JWT
* Criptografia e Hashing
* Cache de Dados ([Issue](https://github.com/nathalia-nobrega/path-planner-back/issues/1))
* Front-end com APIs públicas


## Tecnologias e ferramentas

<p> 
 <a href="https://pt-br.react.dev//" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="40" height="40"/></a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/></a> <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" alt="vite" width="40" height="40"/> </a> <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="node" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="40" height="40"/> </a>
</p>  

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js 14+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install) ou [npm](https://www.npmjs.com/get-npm)


## Configuração das Variáveis de Ambiente

Para que a aplicação funcione corretamente, você precisará configurar a variável de ambiente para a chave de API secreta, devido ao fato de a aplicação fazer uso da Google Places API para manter certas funcionalidades. Para gerar sua chave, consulte o guia do [Google Maps Platform](https://developers.google.com/maps/).

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione as seguintes variáveis ao arquivo `.env`:

    ```env
    VITE_APP_GOOGLE_API_KEY=sua_chave_de_api_secreta
    ```

## Como Executar

1. Instalar as dependências:

    ```bash
    yarn install
    # ou
    npm install
    ```

2. Iniciar o servidor de desenvolvimento:

    ```bash
    yarn dev
    # ou
    npm run dev
    ```

3. A aplicação estará disponível em `http://localhost:5173`.

