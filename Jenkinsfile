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
                dir('front_end_grado') {  
                                bat 'npm run build'
                }
        }

        stage('Test') {
//                dir('front_end_grado') {  
//             steps {
//                 bat 'npm run test'
//             }
//}
        }

        stage('Deploy') {
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
