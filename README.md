# Carea-Backend

Carea-Backend is the backend for a car-selling platform.

## Functionalities:

1. User Auth
2. User Roles
3. Inventory Management
4. Order Management

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

4. Kafka

   1. Kafka is used to offer asynchronous processing of events as well as background processing of tasks such as sending emails.

5. Redis\*

   1. Redis is used as a cache to complement the database’s performance.

6. Docker

   1. Used for deployment.

7. Graphql

   1. Preferred over rest because of the good dev experience, type-safety.

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

## Kafka

- Used for async processing of background tasks
- Can be used for further streaming purposes
- Can be integrated with a schema registry to achieve a typed experienced for the consumers.
