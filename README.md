# Setup

```
yarn install
docker compose up
npx prisma migrate dev
yarn start:dev
```

NOTE: docker compose up will start the database required for the app to work, the commands after docker compose can be ran in a separate terminal

## Running Tests

To run tests and see the coverage, run the following command

```bash
  yarn test:cov
```

## Tech Stack

NestJS, Prisma, Docker
