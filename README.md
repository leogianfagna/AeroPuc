# AeroPUC: Projeto Integrador II - 2023
Trabalho do Projeto Integrador, grupo 8 de 2023.

## Membros:
Leonardo Ferraro Gianfagna - 18174490
[INSERIR NOME DE VOCÊS AQUI]

# Sobre o projeto
Informações sobre esse projeto.

## Descrição:
Esse projeto cria uma página HTML com uma aplicação em back-end, utilizando um banco de dados Oracle. Ele possui uma **área administrativa** e a **área do cliente**, que permite que o usuário compre e reserve passagens de voos em uma interface interativa e amigável.

## Como funciona
Para esse projeto funcionar, foi criado e estruturado em nosso projeto alguns elementos:

### Estrutura dos arquivos
Dentro do projeto, separamos de forma organizada os elementos. Diretamente no repositório do projeto, temos:
- **.env**: contém as credenciais paraa conexão do banco. Como se trata de um trabalho de faculdade, não foi necessário deixar esse arquivo como sigiloso;
- **tsconfig.json**: configura o uso do typescript que foi utilizado para fazer a aplicação back-end, usando o framework express;
- **package.json** e **package-lock.json**: declara os módulos usados (que serão instalados) e informações sobre o projeto

> /interno
Repositório que criamos para testar páginas, guardar arquivos importantes de uso do nosso grupo, entre outros. Ele não segue uma organização e não afeta o funcionamento do projeto.

> /src
Repositório onde fica os elementos que compõe o projeto. Dentro dele, organizamos por tipo de arquivo ou funcionalidade:
    /agregados/ = conjunto html que é repetitivo e utilizado em diversos outros arquivos
    /assets/ = imagens e arquivo css para personalização das páginas
    /javascripts/ = scripts na linguagem .js com diversas funcionalidades e objetivos
    /paginas/ = todos os arquivos .html
    /typescripts/ = arquivo que roda o servidor em .ts

### Funcionamento do servidor
Para salvar as informações de cliente e administrativas, esse projeto usa um banco de dados Oracle. Para fazer a conexão, utiliza-se o framework express em uma aplicação em typescript. Nomeamos como **servidor_http.ts**.

Esse arquivo roda o servidor http localmente na porta **3000**. Dentro dele, diversas funções que fazem chamadas/requisições para o banco de dados, como por exemplo: */listarAeronaves*. Essa chamada será utilizada dentro de uma função Javascript, através de um **fetch**. Assim, conseguimos inserir, visualizar, excluir e controlar dados do banco através do HTML.

### Uso
Começando pelo index, o usuário pode acessar o modo administrativo pela navbar, ou seguir como cliente e comprar uma passagem.

    **Modo administrativo**:
        Feito para controlar TODAS as tabelas que utilizamos no projeto. Portanto, através da navbar, pode selecionar cada tabela e escolher as opções para começar a administrar os dados.

    **Modo cliente**:
        De maneira simples, uma única opção para seguir para o agendamento.

### Funcionamento das tabelas
dizer como controla as compras, assentos, etc


## Como usar
Se você está lendo isso, provavelmente já está com o projeot baixado, mas caso não esteja...