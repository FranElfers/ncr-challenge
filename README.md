# Produccion

Asegurarse de tener los puertos 6379, 3001 y 80 libres.

### Iniciar

`$ docker-compose up -d`

Ir a [http://localhost/](http://localhost/)

### Iniciar sin cache

`$ docker-compose up -d --build`

# Desarrollo

### Base de datos

Iniciar base de datos

`$ docker-compose -f database.yml up -d`

### Servidor

Iniciar servidor...

`$ node /server/dist`

O desarrollar en el servidor

`$ cd server`

`$ npm start`

Tests unitarios (limpia la base de datos)

`$ npm test`

### Cliente

Iniciar React app

`$ cd client`

`$ npm run dev`