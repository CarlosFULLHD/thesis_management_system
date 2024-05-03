pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
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

        stage('Test') {
            steps {
                // Comentado ya que las pruebas no están definidas por ahora
                // dir('front_end_grado') {  
                //     bat 'npm run test'
                // }
            }
        }

        stage('Deploy') {
            steps {
                // Comentado ya que no se hará deploy por ahora
                dir('front_end_grado') {  
                    bat 'npm run export'
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
