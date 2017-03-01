# rethink-express-api-boilerplate

Another backend boilerplate, based on express and rethinkdb backend.

This repo is a **Work in Progress**


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
