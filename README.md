# Diploma - Simple Transport Backend
- [Website](https://simple-transport.netlify.app)

### Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [How To Use](#how-to-use)
    - [Installation](#installation)
    - [Setup environment variables](#setup-environment-variables)
    - [Run the application](#run-the-application)
    - [Tests](#tests)
- [Author Info](#author-info)

---

## Description

Full-stack application that allows users to create an account and add a new vehicle up for rent.
Then these vehicles are available for rent to all other users and vehicles from other users are available for rent to the created user.
Admins can add, edit and delete all other information exept vehicles and users.

---

## Technologies

- Typescript
- NestJS
- ExpressJS
- PostgreSQL
- TypeORM
- Thunder Client
- Heroku
- Git
- Github

---

## How To Use

#### Installation

Follow these instructions to install and setup the application

```bash
# Clone repository
$ git clone https://github.com/dadolyner/SimpleTransport-Backend
```

```bash
# Install dependencies
$ npm i
```
#### Setup environment variables

```ts
// In the root directory create .env file 
// Fill the following variables (fill them with your own values)
// Database connection
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

// Test connection
TEST_DATABASE_HOST=
TEST_DATABASE_PORT=
TEST_DATABASE_USER=
TEST_DATABASE_PASSWORD=
TEST_DATABASE_NAME=

// Secret key for JWT
ACCESS_TOKEN_SECRET=

// Email configuration
STMP_USER=
STMP_PASS=

// Backend and frontend url and port
SERVER_IP=
SERVER_PORT=
FRONTEND_IP=
FRONTEND_PORT=
```

#### Run the application

```bash
# Run the application
$ npm run start
```

#### Tests

```bash
# Run tests
$ yarn run tests
```

## Author Info

- Github - [@dadolyner](https://github.com/dadolyner)