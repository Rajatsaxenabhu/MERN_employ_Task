# Employee CRUD Operations Project With CI/CD pipeline and Kubernetes

## Description
This project is given me as a task by startup Company to check my skills. It is a web application that performs **CRUD (Create, Read, Update, Delete)** operations on an employee list. It allows users to manage employee information with a simple and intuitive interface. The project is deployed using **Jenkins** for Continuous Integration/Continuous Deployment (CI/CD), and the application is containerized using **Docker** and deployed on **Kubernetes**.

### Key Features:
- **Create**: Add new employee records.
- **Read**: View employee details.
- **Update**: Modify existing employee information.
- **Delete**: Remove employee records.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Jenkins Setup](#jenkins-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started) – for containerization.
- [Kubernetes](https://kubernetes.io/docs/setup/) – for local deployment.
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) – for interacting with Kubernetes clusters.
- [Jenkins](https://www.jenkins.io/doc/book/installing/) – for setting up CI/CD pipelines.

### Setting Up Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajatsaxenabhu/MERN_employ_Task.git

2. Install project dependencies (for example, for Node.js or Python):
    npm install  # for a Node.js project, for example

3. Jenkins Setup
    Install Jenkins: Follow the installation instructions for Jenkins if you don’t have it set up already.

    Create a new Jenkins Job:

    Create a new "Pipeline" job in Jenkins.

    In the Pipeline section, add the following pipeline script:

4. Kubernetes Deployment
    To deploy the application on Kubernetes:

    Set up Kubernetes Cluster on AWS and make sure your cluster is up and running.

    Kubernetes Config Files:
    
    I have the kubernetes manifist file in my K8s folder

    Apply the configration :

    kubectl apply -f env.yml
    kubectl apply -f database.yml
    kubectl apply -f back_end.yml
    kubectl apply -f front_end.yml
    kubectl apply -f ingress.yml

5. Set Up a Route 53 DNS record to map your custom hostname to your Kubernetes  Ingress.

6. Configure AWS Load Balancer (via Ingress) to expose the application outside the Kubernetes cluster.

# Screenshots
# UI Screenshots

![This is the main page where the authentication is done](images/Signup%20&%20Login.png)
![This is the home Dashbaord](images/Home_Dashboard.png)
![Here we can add and update the details of Employee](images/Add_new_and_update_Form.png)
![Here is the list of Employee](images/Employee_List.png)
