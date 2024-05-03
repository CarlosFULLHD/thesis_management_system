pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm run export'
                // Añadir comandos específicos de despliegue dependiendo de la plataforma elegida
                // Ejemplo para Vercel:
                sh 'npx vercel --prod'
            }
        }
    }

    post {
        always {
            // acciones como limpiar el workspace
            cleanWs()
        }
    }
}
