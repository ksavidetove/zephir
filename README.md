# Zephir

Full stack project using :

* React + Apollo Client + Next.JS for Frontend
* Node.js + GraphQL + Nest.js for Backend
  
The backend is an Apollo Federation consisting of :

  * An API Gateway project (zefir-backend)
  * A Microservice (users-microservice)

## Installation

**Docker** should be installed first

To start the project run this command at the root, X being the number of microservices to start
```bash
docker-compose up --scale users-microservice=X
```

## Usage

At startup, navigate to **localhost:3000** to access the website

The gateway is located at **localhost:4000**

The microservice is accessed through an nginx proxy at **localhost:5000**
