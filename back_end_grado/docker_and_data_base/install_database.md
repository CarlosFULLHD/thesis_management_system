## Instalación de la Base de Datos

1. Hacer correr una instancia Postgres en docker:

Este codigo nombra el contenedor: "gradodb", con contraseña: "1234"

Para conectarse desde nuestro puerto: "5433" hacia el puerto "5432"(NO CAMBIAR ESTE segundo, viene por defecto para conectarse a postgres correctamente)

Descargando como imagen postgres de la version "16"(ultima version octubre-2023)

```
docker run --name gradodb -e POSTGRES_PASSWORD=1234 -p 5433:5432 -d postgres:16
```

2. Me conecto a la DB database mediante DataGrip

   Use estas credenciales, puede cambiarlas si desea

```
Host: localhost
Port: 5433
Authenticacion: User & Password
User: postgres
Password: 1234
Database: postgres
```

Se hace "Test Connection con esas credenciales y se conecta con Datagrip"

3. Ejecutan el script "database2.sql" de la carpeta "database". Este contiene la DB y datos de prueba

4. Verificar en la carpeta .yml la conexión correcta la la DB, copiar esta conexión:

```
spring:
  datasource:
    url: jdbc:postgresql://localhost:5433/postgres
    username: postgres
    password: 1234
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update # You can set this to "update" or "none" based on your needs
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

---

Nota: Una vez hecho el paso 1, para volver a correr el contenedor de docker(que tiene la base de datos)

```
docker start gradodb
```

---
