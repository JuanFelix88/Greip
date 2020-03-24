<img src="./assets/repo.svg">

## Overview

`Greip` é um projeto criado para automatizar processos antes e durante o desenvolvimento de projetos com JavaScript e toda a sua stack. Focado em distribuição de design patterns, templetates e um controle de projetos mais amigável e ao mesmo tempo completo.

É importante lembrar que o projeto está aberto para contribuição e isso é muito importante para abranger melhor os projetos, diminuir os bugs o escalar em termos de qualidade nos serviços.

## Install

Para utilizar a CLI, é recomendável que você instale de forma global e link a dependência com o seu terminal, siga as instruções conforme à baixo:

`npm`:

    $ npm link greip

`yarn`:

    $ yarn link greip

Verifique se a CLi foi instalada de forma correta com o seguinte comando:

    $ greip -v

## CLI Guide

Para utilização da CLI, você poderá seguir os passos relacionados à baixo, semanticamente separados para cada qual finalidade você deseja usar.

### Register

Antes de iniciar na utilização da CLI, opcionalmente você poderá se cadastrar na plataforma, mas não se preocupe, esse processo é simples e rápido, veja:

-   Command:

        $ greip register

    -   Necessary informations:

        -   Name;
        -   Password;
        -   E-mail;

### Login

Se caso você já possuir um cadastro, poderá realizar login da através dos comandos:

-   Simplificado:

    -   Command:

            $ greip login [email<string>] [password<string>]

*   Interface:

    -   Command:

            $ greip login

    -   Necessary interface information:

        -   E-mail;
        -   Password;

### Interface Padrão

Para acessar a interface padrão da CLI, você poderá tentar omitindo qualquer comando ou parâmetro adicional, segue conforme à baixo:

-   Commands:

        $ greip

### New Project

Para criar um novo projeto é necessário primeiramente que você esteja na pasta raiz do projeto ou repositório e então execute os comandos conforme à baixo:

-   Command:

        $ greip new project --name=[project<string>](optional)

    -   Necessary interface information:

        -   Project Name;
        -   Private Project;
        -   Password (optional);
        -   Language (optional);
        -   Git Repo (optional);

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

# License

MIT - see LICENSE
