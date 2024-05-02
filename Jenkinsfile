pipeline {
    agent any
    
    tools {
        maven 'Maven'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('back_end_grado') {  
                    // Cambia al directorio correcto antes de ejecutar Maven
                    bat 'mvn clean package'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('back_end_grado') {  
                    bat 'mvn test'
                }
            }
        }

        // stage('Deploy to Tomcat') {
        //     steps {
        //         dir('back_end_grado') {
        //             // Comandos de despliegue
        //         }
        //     }
        // }
    }

    post {
        always {
            dir('back_end_grado') {
                archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                junit '**/target/surefire-reports/TEST-*.xml'
            }
        }
    }
}
