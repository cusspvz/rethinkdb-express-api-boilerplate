# rethink-express-api-boilerplate

Another API boilerplate, based on express and rethinkdb backend.

![my api would stay up](https://cloud.githubusercontent.com/assets/3604053/23471562/b069515c-fea1-11e6-944d-06da4b318fe0.jpg)

Includes:

* Async/Promise methods into express (avoid next callback hell)
* Service generator with support for hooks and custom methods (see [todo](https://github.com/cusspvz/rethinkdb-express-api-boilerplate/blob/master/src/services/todo.js) example)
* Model generator (see [todo](https://github.com/cusspvz/rethinkdb-express-api-boilerplate/blob/master/src/models/todo.js) example)
* JWT-based Auth Service
* Docker build image
* User Service


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

## Development

```bash
npm run dev
```

## Updating

**Just place a new copy the boilerplate/ folder on your project**

![for real?](https://cloud.githubusercontent.com/assets/3604053/23471880/c74a5852-fea2-11e6-8c0e-d81c00fd0844.jpg)

And, of course, adjust dependencies on your `package.json`.

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
