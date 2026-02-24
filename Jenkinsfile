pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gemni-clone .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f gemni || true
                docker run -d -p 8090:80 --name gemni gemni-clone
                '''
            }
        }

        stage('Test - Health Check') {
            steps {
                sh '''
                echo "Waiting for container to be ready..."
                sleep 5

                # Get the container's internal Docker IP
                CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' gemni)
                echo "Container IP: $CONTAINER_IP"

                # Curl the container directly on port 80 (internal)
                curl -f http://$CONTAINER_IP:80 || (echo "Health check FAILED" && exit 1)
                echo "Health check PASSED - App is running!"
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