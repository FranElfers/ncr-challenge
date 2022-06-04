# Produccion

Asegurarse de tener los puertos 6379, 3001 y 80 libres.

### Requerimientos:

Windows & Linux:
- Docker

### Iniciar

`$ docker-compose up -d --build`

Ir a [http://localhost/](http://localhost/)

# Desarrollo

### Requerimientos:

Windows:
- Docker
- Node >14

Linux:
- Node >14

### Base de datos

Iniciar base de datos

Win: `$ docker-compose -f database.yml up -d`

Linux: `$ redis-server`

### Servidor

Iniciar servidor...

`$ node /server/dist`

O desarrollar en el servidor

`$ cd server`

`$ npm start`

### Cliente

Iniciar React app

`$ cd client`

`$ npm run dev`

### Test unitarios

Warn: purga la base de datos

`$ cd server`

`$ npm test`