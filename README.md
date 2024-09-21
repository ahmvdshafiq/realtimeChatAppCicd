# CI/CD Pipeline with Jenkins, Docker-in-Docker (DinD), and AWS EC2

This project sets up a continuous integration and continuous deployment (CI/CD) pipeline using Jenkins with Docker-in-Docker (DinD) as the agent, Docker for containerization, and AWS EC2 for deployment. The pipeline automates the building, testing, and deployment of a web application to an EC2 instance, ensuring a streamlined and efficient development workflow.

## Project Overview

The CI/CD pipeline involves the following stages:

- **Build Stage**: The application is built inside a Docker container using Docker-in-Docker (DinD). The `Dockerfile` is used to define the build process, including the installation of dependencies and building of the project.

- **Test Stage**: Automated tests are run in the Docker container to validate the application's functionality, ensuring that any new changes don't break existing features.

- **Docker Image Creation**: Upon a successful build and test, a Docker image is created from the application and tagged with the build version.

- **Push Docker Image**: The newly created Docker image is pushed to a Docker registry Docker Hub to ensure it can be accessed for deployment.

- **Deploy to EC2**: The application is deployed to an AWS EC2 instance using the pushed Docker image. The deployment is done by pulling the Docker image from the registry and running it on the target EC2 instance.

## Prerequisites

To run this project, ensure the following are set up:

1. **Jenkins**: Jenkins needs to be installed and configured with the necessary plugins such as the Docker and Docker Pipeline plugins.
2. **Docker**: Docker and Docker-in-Docker (DinD) should be set up as the Jenkins agent for running containerized builds.
3. **AWS EC2 Instance**: An EC2 instance is used for deployment, and access credentials should be set up in Jenkins.
4. **Docker Registry**: You need access to a Docker registry (such as Docker Hub or Amazon ECR) to store and pull Docker images.

## Pipeline Steps

1. **Pull Code**: Jenkins pulls the code from the version control system (e.g., GitHub) to begin the build.
2. **Build**: The application is built inside a Docker container using DinD to ensure a clean and consistent build environment.
3. **Test**: Automated tests are executed to verify the application’s functionality.
4. **Docker Image Creation**: The Docker image of the application is created and tagged with the appropriate build version.
5. **Push Docker Image**: The Docker image is pushed to the Docker registry for deployment.
6. **Deploy to EC2**: The pipeline deploys the Docker container to the AWS EC2 instance by pulling the image from the registry.

## How to Run the Pipeline

1. Configure Jenkins with Docker support and set up the DinD agent.
2. Set up your Jenkins pipeline script (either through a Jenkinsfile or within Jenkins).
3. Make sure your AWS EC2 instance is up and running with Docker installed.
4. Ensure AWS credentials are correctly configured in Jenkins for deploying to EC2.
5. Run the pipeline to build, test, push the Docker image, and deploy the application.



## Tools and Technologies

1. Jenkins: For CI/CD automation.
2. Docker-in-Docker (DinD): To containerize the application and manage dependencies within the Jenkins agent.
3. AWS EC2: As the deployment environment for hosting the application.
4 .SSH: For remote server deployment.


## Expected Output

![Screenshot_2024-09-17_12-00-18](https://github.com/user-attachments/assets/5763b0ae-7cdf-4ac3-9717-d652781b58d3)
