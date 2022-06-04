# Produccion

Asegurarse de tener los puertos 6379, 3001 y 80 libres.

## Requerimientos:

Windows & Linux:
- Docker

## Iniciar

`$ docker-compose up -d --build`

Ir a [http://localhost/](http://localhost/)

# Desarrollo

## Requerimientos:

Windows:
- Docker
- Node >14

Linux:
- Node >14

## Base de datos

Iniciar base de datos

Win: `$ docker-compose -f database.yml up -d`

Linux: `$ redis-server`

## Servidor

`$ cd server`

`$ npm install`

Iniciar servidor

`$ npm run dev`

Test unitarios (purga la base de datos)

`$ npm test`

## Cliente

`$ cd client`

`$ npm install`

Iniciar React app

`$ npm run dev`