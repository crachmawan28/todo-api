pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/crachmawan28/todo-api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t todo-app:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /home/cr/docker-apps/mongodb
		    git pull origin main
            	    cd ..
                    docker compose down
                    docker compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deploy berhasil!'
        }
        failure {
            echo '❌ Deploy gagal, cek log di atas.'
        }
    }
}
