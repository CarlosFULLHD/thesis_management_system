# Documentación de CI/CD usando Jenkins y Netlify para el Frontend

Esta guía documenta el proceso de configuración y uso de Jenkins y Netlify para el despliegue continuo de una aplicación Next.js.

## Índice

- [Configuración de Jenkins](#configuración-de-jenkins)
- [Configuración de Netlify](#configuración-de-netlify)
- [Creación del Jenkinsfile](#creación-del-jenkinsfile)
- [Despliegue en Netlify](#despliegue-en-netlify)
- [Seguridad y Mejores Prácticas](#seguridad-y-mejores-prácticas)

## Configuración de Jenkins

### Instalación de Jenkins

1. Descargar Jenkins desde [Jenkins.io](https://jenkins.io/download/).
2. Instalar Jenkins en el servidor o localmente según las instrucciones del instalador.

### Configuración de Plugins

Instalar los siguientes plugins:

- NodeJS Plugin
- Credentials Plugin

### Configuración de Credenciales

Guardar las credenciales para Netlify en Jenkins:

- Ir a _Dashboard → Manage Jenkins → Manage Credentials → (global)_
- Añadir credenciales:
  - **Type**: Secret text
  - **Scope**: Global
  - **ID**: `netlify-auth-token`
  - **Secret**: `<TU_NETLIFY_AUTH_TOKEN>`

## Configuración de Netlify

### Creación de un sitio en Netlify

1. Crear una cuenta en [Netlify](https://www.netlify.com/).
2. Crear un nuevo sitio desde Git y conectar el repositorio de GitHub.

### Base Directory, Publish Directory y NETLIFY_AUTH_TOKEN

#### Base Directory

**Base Directory** es la carpeta en tu repositorio de código fuente que contiene tu aplicación. En este caso, se usa `front_end_grado` porque es donde están los archivos de tu proyecto Next.js. Configurar correctamente esta ruta es crucial para que Netlify sepa dónde encontrar los archivos que necesita para construir y desplegar tu aplicación.

#### Publish Directory

**Publish Directory** es la carpeta que contiene los archivos estáticos generados por el proceso de construcción (`npm run build`). En Next.js, cuando se configura la salida estática (`output: 'export'`), los archivos generados se colocan en una carpeta llamada `out`. Netlify necesita saber dónde encontrar estos archivos para poder servirlos como tu sitio web.

```toml
[build]
  base = "front_end_grado"
  publish = "out"
  command = "npm run build"
```

- **base**: `front_end_grado` indica la ruta desde la raíz del repositorio hasta la carpeta donde se encuentra el proyecto.
- **publish**: `out` es el directorio que contiene los archivos estáticos generados después de ejecutar `npm run build`. Este es el directorio que Netlify servirá como tu sitio web.
- **command**: `npm run build` es el comando que Netlify ejecutará para construir tu proyecto. Este comando debe estar definido en tu `package.json` y generalmente ejecuta el proceso de construcción de Next.js, que incluye la generación de la carpeta `out`.

#### NETLIFY_AUTH_TOKEN

**NETLIFY_AUTH_TOKEN** es un token de autenticación que Netlify utiliza para autorizar acciones de despliegue desde la línea de comandos o desde herramientas automatizadas como Jenkins. Este token se puede generar en el panel de administración de Netlify y se debe almacenar de forma segura en Jenkins.

1. **Generar el NETLIFY_AUTH_TOKEN**:

   - Inicia sesión en tu cuenta de Netlify.
   - Ve a **User Settings** > **Applications** > **Personal Access Tokens**.
   - Crea un nuevo token y copia el valor generado.

2. **Almacenar el NETLIFY_AUTH_TOKEN en Jenkins**:

   - En el dashboard de Jenkins, ve a **Manage Jenkins** > **Manage Credentials** > **(global)** > **Add Credentials**.
   - Selecciona **Secret text** como el tipo de credencial.
   - Pega el token generado en el campo **Secret**.
   - Asigna un **ID** como `netlify-auth-token` para identificar este token en el Jenkinsfile.

3. **Usar el NETLIFY_AUTH_TOKEN en el Jenkinsfile**:
   - Declara el token en el bloque de `environment` en tu Jenkinsfile.
   - Usa el token en el comando de despliegue para autenticarte con Netlify.

```groovy

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
    }

```

## Creación del Jenkinsfile

### Jenkinsfile

El Jenkinsfile configura el pipeline para la integración y despliegue continuo.

```groovy
pipeline {
    agent any
    triggers {
        pollSCM('H */6 * * *')
    }
    tools {
        nodejs "NodeJS"
    }
    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                dir('front_end_grado') {
                    bat 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('front_end_grado') {
                    bat 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('front_end_grado') {
                    bat 'netlify deploy --prod --dir=out --site <YOUR_SITE_ID> --auth %NETLIFY_AUTH_TOKEN%'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
```

### Despliegue en Netlify

Para hacer deploy en Netlify, asegúrate de tener configurado el sitio y el token de autenticación en Jenkins. El sitio ID y el token se obtienen desde la configuración de tu sitio en Netlify.

### Conexión y Login en Netlify

1. **Netlify CLI**: Asegúrate de tener instalada la CLI de Netlify. Para instalarla, ejecuta:

   ```sh
   npm install -g netlify-cli
   ```

2. **Autenticación**: Autentícate en Netlify usando:

   ```sh
   netlify login
   ```

3. **Link del Sitio**: Si necesitas linkear el sitio, ejecuta:
   ```sh
   netlify link
   ```
