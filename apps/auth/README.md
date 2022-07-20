## Auth service

# Installation

- Run:
  `yarn`
- Fill .env file

> > ``
> > RABBIT_MQ_URI=

> > RABBIT_MQ_EMAIL_QUEUE=EMAIL

> > DATABASE_URL= "must be a cluster replica set"

> > ``

- Run :
  `npx prisma generate && npx prisma db push`

Enjoy! :-)
