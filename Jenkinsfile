pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'xerathApi'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MaoAstud/XerathFrontEnd'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Unit Tests') {
            steps {
                bat 'ng test'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
