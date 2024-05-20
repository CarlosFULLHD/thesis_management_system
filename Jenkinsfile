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
                    bat 'netlify deploy --prod --dir=out --site be7eb4b3-b448-4333-8211-cc97b1a0a398 --auth %NETLIFY_AUTH_TOKEN%'
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
