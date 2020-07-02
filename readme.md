# Instruções para executar a aplicação

Para conseguir executar essa aplicação, deve-se ter o NPM instalado em seu PC. Para que seja possível instalar o NPM, devemos acessar o link a seguir e baixar o instalador do Node, assim que o instalador do Node for baixado, deve ser executado, para que o NPM, junto ao Node, seja instalado. Segue o link para baixar o Node: [Node Download](https://nodejs.org/en/).

Baixe a versão LTS.

Logo após instalar o node em seu PC, é importante instalar o Yarn, que é o gerenciador de pacotes utilizado nesta aplicação. Para instalá-lo, basta acessar o seguinte link [Yarn Download](https://classic.yarnpkg.com/en/docs/install/#windows-stable) e baixar o setup.

Após a instalação do Yarn, acessar a pasta onde a aplicação está localizada, através do terminal, e executar o seguinte comando:

```bash
yarn
```

Este comando irá instalar todas as dependências para o projeto ser executado.

Após isso, rode o comando:
```bash
yarn dev-server
```
E pronto! A aplicação estará rodando em ambiente de desenvolvimento.


## Build

Para realizar o build do projeto, basta rodar o seguinte comando em seu terminal:

```bash
yarn build
```
Esse comando irá gerar a versão de produção, porém não é possível simplesmente abrir o HTML e utilizar a aplicação. É necessário rodar ela em um servidor, e para isso deve-se executar o seguinte comando no terminal

```bash
yarn global add serve
```

Esse comando irá criar um servidor local, onde a aplicação estará hospedada. Para ser executado, deve-se utilizar o seguinte comando:
```bash
serve -s dist
```
Esse comando cria um servidor local, que irá consumir a pasta indicada, que nesse caso é a pasta dist. O terminal irá apresentar um log parecido com isso:

![Serve Example](./readme_assets/serve_asset.png?raw=true "Serve")

Agora basta ir em seu navegador e acessar qualquer um dos links!
🙂

## License
[MIT](https://choosealicense.com/licenses/mit/)
