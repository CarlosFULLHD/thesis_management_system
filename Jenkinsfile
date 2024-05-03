pipeline {
      agent any
    triggers {
        pollSCM('H */6 * * *')
    }
    environment {
        // Ruta al archivo WAR generado por Maven
        WAR_FILE = "target/back_end_grado-0.0.1-SNAPSHOT.war"
        // URL del Tomcat Manager
        TOMCAT_URL = "http://localhost:9090/manager/text"
        // Credenciales de Tomcat almacenadas de forma segura en Jenkins
        TOMCAT_CREDENTIALS = credentials('1122334455')
    }

    
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

        stage('Deploy to Tomcat') {
            steps {
                script {
                    // Uso de comillas dobles para envolver variables y URL
                    bat "curl -u %TOMCAT_CREDENTIALS_USR%:%TOMCAT_CREDENTIALS_PSW% --upload-file %WAR_FILE% \"%TOMCAT_URL%/deploy?path=/back_end_grado&update=true\""
                }
            }
        }

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
