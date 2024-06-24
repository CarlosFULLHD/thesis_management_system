# Documentación de CI/CD usando Jenkins y Tomcat

Esta guía documenta el proceso de configuración y uso de Jenkins y Tomcat para el despliegue continuo de una aplicación Spring Boot.

## Índice

- [Configuración de Jenkins](#configuración-de-jenkins)
- [Configuración de Tomcat](#configuración-de-tomcat)
- [Creación del Jenkinsfile](#creación-del-jenkinsfile)
- [Despliegue en Tomcat](#despliegue-en-tomcat)
- [Seguridad y Mejores Prácticas](#seguridad-y-mejores-prácticas)

## Configuración de Jenkins

### Instalación de Jenkins

1. Descargar Jenkins desde [Jenkins.io](https://jenkins.io/download/).
2. Instalar Jenkins en el servidor o localmente según las instrucciones del instalador.

### Configuración de Plugins

Instalar los siguientes plugins:

- Maven Integration
- Credentials Plugin

### Configuración de Credenciales

Guardar las credenciales para Tomcat en Jenkins:

- Ir a _Dashboard → Manage Jenkins → Manage Credentials → (global)_
- Añadir credenciales:
  - **Type**: Username with password
  - **Scope**: Global
  - **ID**: `TOMCAT_USER`
  - **Username**: `usuario_tomcat`
  - **Password**: `contraseña_tomcat`

## Configuración de Tomcat

### Instalación de Tomcat

1. Descargar Tomcat desde [Tomcat.apache.org](https://tomcat.apache.org/download-90.cgi).
2. Descomprimir el archivo en la ubicación deseada.

### Configuración de Usuarios

Editar el archivo `conf/tomcat-users.xml` para añadir un usuario administrador:

```xml
<tomcat-users>
    <role rolename="manager-script"/>
    <user username="usuario_tomcat" password="contraseña_tomcat" roles="manager-script"/>
</tomcat-users>
```

### Configuración para setenv.bat

-Xms256M y -Xmx512M para JAVA_OPTS

- Establece la memoria inicial y máxima que Java puede utilizar. Ajusta estos valores según la memoria disponible en tu PC.

-XX:+UseConcMarkSweepGC

- Utiliza el recolector de basura Concurrent Mark Sweep, que minimiza los tiempos de pausa durante la recolección de basura, útil en entornos donde la respuesta rápida es necesaria.

CATALINA_OPTS con menos memoria que JAVA_OPTS

- Esto es para asegurar que Tomcat tenga suficiente memoria para operar, pero no tanto como para impactar otras operaciones en el computador.

```
set "JAVA_OPTS=-Xms256M -Xmx512M -XX:+UseConcMarkSweepGC"
set "CATALINA_OPTS=-Xms128M -Xmx256M"
```

### Creacion del Jenkinsfile

Se crea un pipeline para que se realice un trigger el cual revisará los cambios en los commits cada 6 horas

```groovy
    triggers {
        pollSCM('H */6 * * *')
    }
```

### Configuración del Archivo WAR

#### Variable `WAR_FILE`

La variable `WAR_FILE` en el `Jenkinsfile` es crucial para especificar la ubicación del archivo WAR que se generará después de compilar el proyecto. Esta variable se utiliza para referenciar el archivo durante el proceso de despliegue en Tomcat.

```groovy
environment {
    // Ruta al archivo WAR generado por Maven
    WAR_FILE = "target/back_end_grado-0.0.1-SNAPSHOT.war"
}
```

- target/: Este es el directorio por defecto donde Maven almacena los artefactos generados tras la construcción del proyecto. Es aquí donde se colocará el archivo .war después de ejecutar el comando mvn package.
- back_end_grado-0.0.1-SNAPSHOT.war: Este nombre se compone del artifactId del proyecto, que es back_end_grado, seguido de la versión del proyecto 0.0.1-SNAPSHOT. La extensión .war indica que es un archivo Web Application Archive, listo para ser desplegado en un servidor de aplicaciones Java EE como Tomcat.

### Configuración de Credenciales de Tomcat

Para realizar despliegues automáticos en Tomcat a través de Jenkins, es esencial almacenar de forma segura las credenciales del usuario que tiene permisos para utilizar el Manager de Tomcat. A continuación, se describe cómo configurar estas credenciales:

1. **Almacenamiento de Credenciales en Jenkins**:

   - Accede al panel de control de Jenkins y navega a _Manage Jenkins_ → _Manage Credentials_.
   - Dentro de la sección _Credentials_, selecciona _(global)_ y luego haz clic en _Add Credentials_ en el menú lateral.
   - Utiliza los siguientes detalles para crear las credenciales:
     - **Kind**: Username with password
     - **Scope**: Global (Esto hace que la credencial esté disponible en todos los proyectos de Jenkins).
     - **Username**: Introduce el nombre de usuario autorizado para el Manager de Tomcat.
     - **Password**: Introduce la contraseña correspondiente al usuario.
     - **ID**: Asigna un identificador único que luego utilizarás en el `Jenkinsfile`, como `TOMCAT_CREDENTIALS`.

   Esta ID es crucial ya que es la referencia que usarás en el pipeline de Jenkins para autenticarte en Tomcat.

2. **Referencia de Credenciales en el Jenkinsfile**:

   - En tu `Jenkinsfile`, debes referenciar el ID de las credenciales cuando configures el entorno para el despliegue. Aquí te mostramos cómo hacerlo:

     ```groovy
     environment {
        // Ruta al archivo WAR generado por Maven
        WAR_FILE = "target/back_end_grado-0.0.1-SNAPSHOT.war"
        // URL del Tomcat Manager
        TOMCAT_URL = "http://localhost:9090/manager/text"
        // Credenciales de Tomcat almacenadas de forma segura en Jenkins
        TOMCAT_CREDENTIALS = credentials('1122334455')
     }
     ```

3. **Uso de Credenciales en el Proceso de Despliegue**:

   - Utiliza las credenciales en los scripts o comandos que requieran autenticación en Tomcat. Por ejemplo, al hacer un deploy usando `curl`:

     ```groovy
        stage('Deploy to Tomcat') {
            steps {
                script {
                dir('back_end_grado/target') {
                    bat "dir back_end_grado-0.0.1-SNAPSHOT.war"
                    bat "curl -u %TOMCAT_CREDENTIALS_USR%:%TOMCAT_CREDENTIALS_PSW% --upload-file back_end_grado-0.0.1-SNAPSHOT.war \"%TOMCAT_URL%/deploy?path=/back_end_grado&update=true\""
            }   }
            }
        }
     ```

     En este script, `TOMCAT_CREDENTIALS_USR` y `TOMCAT_CREDENTIALS_PSW` se extraen automáticamente de `TOMCAT_CREDENTIALS`, permitiendo que el comando `curl` se autentique correctamente con el Manager de Tomcat.

### Despliegue en Tomcat

Acceder a la aplicación a través de http://localhost:9090/myapp después del despliegue.

### Seguridad y Mejores Prácticas

- Seguridad: Utilizar HTTPS para conexiones a Jenkins y Tomcat.
- Backups: Realizar backups regulares de la configuración de Jenkins y Tomcat.
- Monitoreo: Monitorear el rendimiento de la aplicación y del servidor Tomcat.
