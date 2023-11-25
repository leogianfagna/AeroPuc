# AeroPUC: Projeto Integrador II - 2023
Trabalho do Projeto Integrador, grupo 8 de 2023.

## Membros:
Gustavo Giotto Avelar - 23000567
Leonardo Ferraro Gianfagna - 18174490
Mateus Colferai Mistro - 23002896
Renan Negri Cecolin - 23012651
Samuel Arantes dos Santos Prado - 23013858


# Sobre o projeto
Informações sobre esse projeto.

## Descrição:
Esse projeto cria uma página HTML com uma aplicação em back-end, utilizando um banco de dados Oracle. Ele possui uma **área administrativa** e a **área do cliente**, que permite que o usuário compre e reserve passagens de voos em uma interface interativa e amigável.

## Como funciona
Para esse projeto funcionar, foi criado e estruturado em nosso projeto alguns elementos:

### Estrutura dos arquivos
Dentro do projeto, separamos de forma organizada os elementos. Diretamente no repositório do projeto, temos:
- **.env**: contém as credenciais para conexão do banco. Como se trata de um trabalho de faculdade, não foi necessário deixar esse arquivo como sigiloso;
- **tsconfig.json**: configura o uso do typescript que foi utilizado para fazer a aplicação back-end, usando o framework express;
- **package.json** e **package-lock.json**: declara os módulos usados (que serão instalados) e informações sobre o projeto

- **\interno**: Repositório que criamos para testar páginas, guardar arquivos importantes de uso do nosso grupo, entre outros. Ele não segue uma organização e não afeta o funcionamento do projeto.
- **\src**: Repositório onde fica os elementos que compõe o projeto. Dentro dele, organizamos por tipo de arquivo ou funcionalidade:
  - **\agregados**: conjunto html que é repetitivo e utilizado em diversos outros arquivos
  - **\assets**: imagens e arquivo css para personalização das páginas
  - **\javascripts**: scripts na linguagem .js com diversas funcionalidades e objetivos
  - **\paginas**: todos os arquivos .html
    - **\admin**: arquivos .html do módulo 1 (administrador)
    - **\local**: arquivos .html do módulo 2 (cliente)
    - **index.html** : página de início
  - **\typescripts**: arquivo que roda o servidor em .ts
    
### Funcionamento do servidor
Para salvar as informações de cliente e administrativas, esse projeto usa um banco de dados Oracle. Para fazer a conexão, utiliza-se o framework express em uma aplicação em typescript. Nomeamos como **servidor_http.ts**.

Esse arquivo roda o servidor http localmente na porta **3000**. Dentro dele, diversas funções que fazem chamadas/requisições para o banco de dados, como por exemplo: */listarAeronaves*. Essa chamada será utilizada dentro de uma função Javascript, através de um **fetch**. Assim, conseguimos inserir, visualizar, excluir e controlar dados do banco através do HTML.

### Uso
Começando pelo index, o usuário pode acessar o modo administrativo pela navbar, ou seguir como cliente e comprar uma passagem.

🟠 **Modo administrativo:** Feito para controlar TODAS as tabelas que utilizamos no projeto. Portanto, através da navbar, pode selecionar cada tabela e escolher as opções para começar a administrar os dados.

🟢 **Modo cliente:** De maneira simples, uma única opção para seguir para o agendamento. Para agendar, o cliente deve selecionar a data e local de partida e o local de destino para aparecer os voos que correspondem com a sua busca. Feito isso, ao clicar no voo desejado, o mapa de assentos é impresso e o usuário clica no assento para reservar, levando-o para uma tela de pagamento. Nessa tela, dados são solicitados para realizar o pagamento e conduzir até uma tela final.

### Funcionamento das tabelas
Esse projeto possui utiliza as tabelas voos, aeroportos, cidades e trajetos para cadastrar administrativamente opções para o usuário usufruir. No momento que o cliente busca voos, um SELECT é executado com as condições inseridas no HTML. Essa tabela voos usa chaves estrangeiras dos trajetos para sincronizar dados e com assentos para cuidar dos assentos reservados daquele voo.

A tabela cliente e assentos funciona para conseguir armazenar as compras e identificar qual assento foi reservado naquele determinado voo.

## Como usar
Se você está lendo isso, provavelmente já está com o projeto baixado, mas caso não esteja:
1. Usando o IDE Vscode, clone o repositório em algum diretório escolhido usando um novo terminal:
    1. `cd desktop`
    2. `git clone https://github.com/leogianfagna/pi_aeropuc.git`
2. Caso não esteja na rede da PUCCAMP, deve-se utilizar a VPN para conseguir acessar o banco. Para isso, utilize [esse tutorial](https://github.com/leogianfagna/pi_aeropuc).
4. Execute `npm install` para instalar todas as dependências do projeto
5. Execute `npm start` para iniciar o servidor http
6. Utilizando a extensão *Live Server*, vá ao arquivo **index.html** (\src\paginas\index.html) e abra-o ao vivo (opção no canto inferior direito)
7. Comece a usar no browser!

   
