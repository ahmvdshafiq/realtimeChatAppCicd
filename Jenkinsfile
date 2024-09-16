pipeline {
    agent any

    environment {
        DOCKER_CRED_ID = '564e7a8e-7f47-4031-aaf8-94446bbd3e98' 
        DOCKERHUB_CRED_ID = 'cf3a74d7-7de7-4028-8b23-456dec1e21b8'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git url: 'https://github.com/ahmvdshafiq/realtimeChatAppCicd', branch: 'master'
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.build("madbakoyoko/node-chat-app:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run npm test inside a Docker container
                    docker.image("madbakoyoko/node-chat-app:${env.BUILD_NUMBER}").inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CRED_ID) {
                        docker.image("madbakoyoko/node-chat-app:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'keyfile')]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${keyfile} ubuntu@your-ec2-public-ip <<EOF
                            # Stop and remove any existing container
                            docker stop node-chat-app || true
                            docker rm node-chat-app || true

                            # Pull the latest Docker image
                            docker pull yourdockerhubaccount/node-chat-app:${env.BUILD_NUMBER}

                            # Run the container
                            docker run -d -p 3000:3000 --name node-chat-app yourdockerhubaccount/node-chat-app:${env.BUILD_NUMBER}
                        EOF
                        """
                    }
                }
            }
        }
    }
}
