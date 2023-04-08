# Carea-Backend

Carea-Backend is the backend for a car-selling platform.

## Functionalities:

1. User Auth
2. User Roles
3. Inventory Management
4. Order Management
5. Chat
6. One time Payments

## Architecture

The project is built on a monolith with the above functionalities separated in modules.

This allows for single responsibilities and higher cohesion of the modules.

The project uses the following technologies:

1. Nestjs

   1. The opinionated structuring of code into modules allows for good dev experience as well as cleaner code.
   2. The dependency injection allows for cleaner code.

2. Postgres

   1. The data used are highly related to each other thus a relational database is preferred.

3. Prisma

   1. The type-safety, declarative schema file, and good migration support made prisma the perfect choice the Orm.

4. Rabbitmq

   1. Rabbitmq is used to offer asynchronous processing of events as well as background processing of tasks such as sending emails.
   2. Rabbitmq is used specifically as it’s easy to work with.

5. Redis

   1. Redis is used as a cache to complement the database’s performance.

6. Docker

   1. Used for deployment.

7. Graphql

   1. Preferred over rest because of the good dev experience, type-safety.

![](https://res.cloudinary.com/smiley-geek/image/upload/v1679661182/bw79tcanj3eo8phtgpdo.png)

## Installation

### From source

```javascript
git clone https://github.com/smiley-geek/carea-backend.git
yarn
Copy .env.example to .env
Fill .env
yarn prisma db push
yarn start
Go to http://localhost:<port>/graphql
```

### With docker-compose

```javascript
git clone https://github.com/smiley-geek/carea-backend.git
Copy .env.example to .env
Fill .env
yarn prisma db push
docker-compose up -d
Go to http://localhost:<port>/graphql
```

## Logs

- Contains winston logs under logs folder
- Contains all logs and logs specific to errors
