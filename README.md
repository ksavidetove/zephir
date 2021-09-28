# Zephir

Full stack project using :

* React + Apollo Client + Next.JS for Frontend
* Node.js + GraphQL + Nest.js + Postgres (Typeorm) for Backend
  
The backend is an Apollo Federation consisting of :

  * An API Gateway project (zefir-backend)
  * A Microservice (users-microservice)

## Prerequisites

For this project you will need :
 * **Docker**

## Installation

To start the project run this command at the root, X being the number of microservices to start
```bash
docker-compose up --scale users-microservice=X
```

## Usage

At startup, navigate to **localhost:3000** to access the website

The gateway is located at **localhost:4000/graphql**

The microservice is accessed through an nginx proxy at **localhost:5000/graphql** for Subscriptions and **localhost:5000/graphql** for the rest of the graphql calls

## Local Usage

To run the stack locally, first install and build the packages: 
* `yarn install`
* `yarn build:dep`
* `yarn build`
    
Then start in this order:
* The postgres database by running in users-microservice
  `docker-compose up` 
* The users-microservice `yarn run start:dev`
* The gateway zefir-backend `yarn run start:dev`
* The website zefir-app `yarn run dev`
