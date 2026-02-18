pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Check out the code from the configured repository
                // If running locally without SCM configuration, this might fail or do nothing.
                // Ensure your Jenkins job is configured to use 'Git' with this folder path.
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                
                // 1. Create a build directory
                // On Windows, use 'bat' for batch commands
                bat 'if not exist dist mkdir dist'
                
                // 2. Copy source files to the build directory
                bat 'copy index.html dist\\'
                bat 'copy style.css dist\\'
                bat 'copy script.js dist\\'
                
                echo 'Build complete. Files copied to dist/ directory.'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here (e.g., specific to your project)
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying project...'
                // Example: Deploy to a local server folder
                // bat 'xcopy dist C:\\inetpub\\wwwroot\\Gemni-Clone /E /Y'
            }
        }
    }

    post {
        always {
            // Archive the 'dist' directory so you can download it from Jenkins UI
            archiveArtifacts artifacts: 'dist/*', fingerprint: true
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build and Archive Successful!'
        }
    }
}
