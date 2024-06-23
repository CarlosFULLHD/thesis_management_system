## Requerimientos

Para lograr ejecutar el programa se debe tener instalado:

- Java 17
- Maven 3.8.4
- Docker
- Visual studio code, con extensión REST CLIENT o IntelliJ IDEA - IDE
  Se recomienda utilizar un sistema operativo UNIX like o UNIX

## Compilación

Para compilar el proyecto, ejecutar los siguientes comandos en el directorio raiz del proyecto

```
mvn clean package
```

## Ejecucion

Para ejecutar el proyecto, ejecutar los siguientes comandos en el directorio raiz del proyecto

### Instalación de la base de datos

1. Construir una imagen en base al documento docker, ubicado en el directorio "docerAndDataBase"

```
docker build -t postgres-img ./docker_and_data_base
```

2. Crear un contenedor en base a la imagen

```
docker run -d -p 5433:5432 --name postgres-cont postgres-img
```

3. Conectarse a la base de datos

```
docker exec -it postgres-cont psql -U postgres -d grado
```

4. Ejecución de la RESTful API con spring-boot

```
mvn spring-boot:run
```

La base de datos es creada autimáticamente una vez construida la imagen, así que la aplicación esta
lista para ser utilizada.

---
