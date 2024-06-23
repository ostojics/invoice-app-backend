# Setup

```
yarn install
docker compose up -d
yarn db:setup
yarn start
```

NOTE: docker compose up will start the database required for the app to work, the commands after docker compose can be ran in a separate terminal

## Running Tests

To run tests and see the coverage, run the following command

```bash
  yarn test:cov
```

## Tech Stack

NestJS, Prisma, Docker
