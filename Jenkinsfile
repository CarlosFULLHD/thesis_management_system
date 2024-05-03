pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Asegúrate de que el nombre coincida con la configuración en Global Tool Configuration
    }

    stages {
        stage('Install dependencies') {
            steps {
                dir('back_end_grado') {  
                                bat 'npm install'
                }
                
            }
        }

        stage('Build') {
                dir('back_end_grado') {  
                                bat 'npm run build'
                }
        }

        stage('Test') {
//                dir('back_end_grado') {  
//             steps {
//                 bat 'npm run test'
//             }
//}
        }

        stage('Deploy') {
                // Comentado ya que no se hará deploy por ahora
                dir('back_end_grado') {  
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
