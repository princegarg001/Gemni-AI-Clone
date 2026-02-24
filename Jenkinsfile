pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git credentialsId: 'github-creds',
                    url: 'https://github.com/prince-1234567890/Gemni-Clone.git',
                    branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gemni-clone .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f gemni || true
                docker run -d -p 8080:80 --name gemni gemni-clone
                '''
            }
        }

        stage('Test - Health Check') {
            steps {
                sh '''
                echo "Waiting for container to be ready..."
                sleep 5
                curl -f http://localhost:8080 || (echo "Health check FAILED" && exit 1)
                echo "Health check PASSED - App is running on port 8080"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline SUCCESS — Gemini Clone is live at http://localhost:8080'
        }
        failure {
            echo '❌ Pipeline FAILED — Check logs above for details'
            sh 'docker logs gemni || true'
        }
    }
}