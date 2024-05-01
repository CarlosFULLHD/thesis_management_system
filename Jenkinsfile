pipeline {
    agent any
    
    environment {
        // Using environment variables for Maven and Tomcat deployment
        MVN_HOME = tool 'Maven 3'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat "${MVN_HOME}/bin/mvn clean package"
            }
        }
        
        stage('Test') {
            steps {
                bat "${MVN_HOME}/bin/mvn test"
            }
        }

        // stage('Deploy to Tomcat') {
        //     steps {
        //         // Here you would add the steps to deploy to Tomcat
        //         // The specific commands depend on how you can access your Tomcat server
        //         // This might be done via a script that uses Tomcat's Manager, FTP, SSH, or other means
        //     }
        // }
    }

    post {
        always {
            archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }
}