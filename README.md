CI/CD Pipeline with Jenkins, Docker-in-Docker (DinD), and AWS EC2
This project sets up a continuous integration and continuous deployment (CI/CD) pipeline using Jenkins with Docker-in-Docker (DinD) as the agent, Docker for containerization, and AWS EC2 for deployment. The pipeline automates the building, testing, and deployment of a web application to an EC2 instance, ensuring a streamlined and efficient development workflow.

Project Overview
The CI/CD pipeline involves the following stages:

Build Stage: The application is built inside a Docker container using Docker-in-Docker (DinD). A Docker image containing all dependencies is created.
Test Stage: Automated tests are executed inside the container to ensure the functionality and integrity of the application.
Docker Image Push: The Docker image is pushed to a remote container registry (e.g., Docker Hub or Amazon ECR).
Deploy Stage: The application is deployed to an AWS EC2 instance, where the latest Docker image is pulled and run inside a container.
Pipeline Stages
Build Docker Image:

The pipeline creates a Docker image for the web application within a DinD agent.
Run Tests:

Unit and integration tests are run automatically in the Docker container to ensure code quality.
Push Docker Image:

The Docker image is pushed to a specified container registry.
Deploy to AWS EC2:

The application is deployed to an AWS EC2 instance using Docker. The EC2 instance pulls the Docker image and runs the container.
Prerequisites
Jenkins: Ensure Jenkins is installed and configured with Docker-in-Docker (DinD) for the pipeline agent.
Docker: Docker must be installed on both the Jenkins server and the EC2 instance.
AWS EC2: An EC2 instance must be set up and accessible with Docker installed.
Docker Hub or ECR: A container registry to store and pull Docker images.


Getting Started
1. Configure Jenkins Pipeline
Ensure your Jenkinsfile is configured properly for a Docker-in-Docker agent setup. 
2. Set Up AWS EC2
Launch an AWS EC2 instance and ensure Docker is installed.
Ensure the EC2 instance has the appropriate security groups configured for SSH and HTTP/HTTPS traffic.
3. Docker Registry
Configure Docker credentials in Jenkins for accessing the Docker registry.
The image will be stored in the registry (e.g., Docker Hub or Amazon ECR) and pulled by the EC2 instance during the deployment stage.


Tools and Technologies
Jenkins: For CI/CD automation.
Docker-in-Docker (DinD): To containerize the application and manage dependencies within the Jenkins agent.
AWS EC2: As the deployment environment for hosting the application.
SSH: For remote server deployment.


How to Run
Clone the repository to your local machine.
Set up Jenkins and configure the pipeline using the provided Jenkinsfile.
Ensure AWS EC2 and Docker registry credentials are set up correctly in Jenkins.
Run the pipeline in Jenkins to build, test, and deploy the application.

![Screenshot_2024-09-17_12-00-18](https://github.com/user-attachments/assets/5763b0ae-7cdf-4ac3-9717-d652781b58d3)
