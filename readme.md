<img src="./assets/repo_logo.png" style="width: 170px">

# Overview

**Greip** é um projeto criado para automatizar processos antes e durante o desenvolvimento de projetos com _JavaScript_ e toda a sua stack. Focado em distribuição de design patterns, templetates e um controle de projetos mais amigável e ao mesmo tempo completo.

É importante lembrar que o projeto está aberto para contribuição e isso é muito importante para abranger melhor os projetos, diminuir os bugs o escalar em termos de qualidade nos serviços.

# Install

Para utilizar a CLI, é recomendável que você instale de forma global e link a dependência com o seu terminal, siga as instruções conforme à baixo:

**npm**:

> ```shell
> $ npm link greip
> ```

**yarn**:

> ```shell
> $ yarn link greip
> ```

Verifique se a CLI foi instalada de forma correta com o seguinte comando:

> ```shell
> $ greip -v # prints version
> ```

# CLI Guide

Para utilização da CLI, você poderá seguir os passos relacionados à baixo, semanticamente separados para cada qual finalidade você precisar usar.

## Register

Antes de iniciar na utilização da CLI, opcionalmente você poderá se cadastrar na plataforma, mas não se preocupe, esse processo é simples e rápido, veja:

-   Command:

    > ```shell
    > $ greip register
    > ```


    -   Necessary informations:

        -   Name;
        -   Password;
        -   E-mail;

## Login

Se caso você já possuir um cadastro, poderá realizar login através dos comandos a seguir:

-   Simplificado:

    -   Command:

        > ```shell
        > $ greip login [email=<string>] [password=<string>]
        > ```


        -   Parameters:

            -   email `[first]`

                Email do login do usuário;

            -   password `[second]`

                Email do login do usuário;

-   Interface:

    -   Command:

        > ```shell
        > $ greip login
        > ```

    -   Necessary interface information:

        -   E-mail;
        -   Password;

## Interface Principal

Para acessar a interface padrão da CLI, você poderá tentar executar omitindo qualquer comando ou parâmetro adicional, segue conforme à baixo:

-   Command:

    > ```shell
    > $ greip
    > ```

## New Project

Para criar um novo projeto é necessário primeiramente que você esteja na pasta raiz do projeto ou repositório desejado e então execute os comandos conforme à baixo:

-   Command:

    > ```shell
    > $ greip new project --name="<string>"
    > ```

    -   Flags (optional):

        -   name

            Nome do projeto que deseja criar;

    -   Necessary interface information:

        -   Project Name;
        -   Private Project;
        -   Password (optional);
        -   Language (optional);
        -   Git Repo (optional);

## Load Project

No `Greip` você pode carregar um projeto rapidamente, segue informações conforme à baixo:

-   Simplificado:

    Para uso simplificado, informando o nome do projeto como parâmetro você carregará automaticamente caso seja encontrado na base de dados.

    -   Command:

        > ```shell
        > $ greip load [name=<string>]
        > ```


        -   Parameters:

            -   name `[first]`

                Nome do projeto (o parâmetro deverá corresponder exatamente ao nome do projeto [case sensitive]);

-   Interface:

    Opcionalmente você poderá acessar a interface para procurar manualmente e selecionar o projeto desejado.

    -   Command:

        > ```shell
        > $ greip load
        > ```


    -   Necessary interface information:

        -   Select project;

# License

MIT - see LICENSE
