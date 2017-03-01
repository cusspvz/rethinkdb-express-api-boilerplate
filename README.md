# rethink-express-api-boilerplate

Another API boilerplate, based on express and rethinkdb backend.

![zuiebw](https://cloud.githubusercontent.com/assets/3604053/23471562/b069515c-fea1-11e6-944d-06da4b318fe0.jpg)

Includes:

* Docker build image
* Auth Service
* User Service
* Service generator
* Model generator


Uses:

* Express
* RethinkDB
* Babel latest preset (ES6, ES2015, ES2016, ES2017) + stage-0
* [cusspvz/node.docker](https://github.com/cusspvz/node.docker)

## Requirements

* Node.JS
* Yarn / NPM

## Instalation

```bash
git clone https://github.com/cusspvz/rethinkdb-express-api-boilerplate my-api
cd my-api
yarn install # or: npm install
```

## Instalation

```bash
npm run dev
```



## Building

```
npm run build
```

## Docker image

### Building
```
docker run build -t your-username/my-webapp .
```

### Publishing
```
docker push your-username/my-webapp
```
