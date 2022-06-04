```console
git clone https://github.com/FranElfers/ncr-challenge
```

```console
cd ncr-challenge
```

# Produccion

Asegurarse de tener los puertos 6379, 3001 y 80 libres.

## Requerimientos:

Windows & Linux:
- Docker

## Iniciar

```console
docker-compose up -d
```

Ir a [http://localhost/](http://localhost/)

## Detener

```console
docker-compose down
```

# Desarrollo

## Requerimientos:

Windows:
- Docker
- Node >14

Linux:
- Node >14

## 1. Base de datos

Iniciar base de datos

Windows
```console
docker-compose -f database.yml up -d
```

Linux
```console
redis-server
```

Detener base de datos

Windows
```console
docker-compose -f database.yml down
```

## 2. Servidor

En otra terminal

```console
cd server
```

```console
npm install
```

Iniciar servidor

```console
npm run dev
```

Test unitarios (purga la base de datos)

```console
npm test
```

## 3. Cliente

En otra terminal

```console
cd client
```

```console
npm install
```

Iniciar React app

```console
npm run dev
```

## 4. Aplicar cambios a produccion

```console
docker-compose down
```

```console
docker-compose up -d --build
```

Borrar cache de docker en caso de errores

```console
docker system prune -a
```