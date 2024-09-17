# E-Commerce-Fullstack

This fullstack application features a PostgreSQL Database connected to a Dockerized Node/Typescript REST API. The frontend is built using Typescript and the Next.js framework for React.

From the root directory, you can run all commands for both the backend and the frontend. 
- Install `npm run install`
- Lint `npm run lint`
- Test `npm run test`
- Build `npm run build`
- Start (Locally) `npm run dev`

## Backend

Technologies:
- Node.js
- Typescript
- Docker
- PostgreSQL
- Express.js

The backend of this application has endpoints to manage products and orders for an ecommerce site. You can Create, Update, Read, and Delete from the PostgreSQL database via the API endpoints. This is intended to be hosted in AWS and follow the architecture outlined below.

### Installation
```
npm install
```

## Tests
```
npm run test
```

## Usage
The default port for the backend is run on 3001, so running locally, calls should be made to `http://localhost:3001/{ENDPOINT}`
This project assumes the PostgreSQL database is already running and configured correctly.  
  
To create the required database tables, install `knex` and run the following command
```
cd ./backend/src/db && knex migrate:up
```

To get started run:
```
npm run dev
```

## Environment Variables
|  Name | Default Value  | Description  |   
|-------|----------------|--------------|
| DATABASE_HOST | localhost | database host |
| DATABASE_PASSWORD | N/A | password to your database |
| WHITELIST_ORIGINS | N/A | list of domains which have access to the API via CORS |

[infrastructure](./infrastructure.png)

## Frontend

Technologies:
- Typescript
- Next.js
- React
- NextUI
- Tailwind CSS

### Installation
```
npm install
```

## Tests
```
npm run test
```

## Environment Variables
N/A

## Usage
The default port for the frontend is on 3000, so running locally, open your browser to `http://localhost:3000`

To get started run:
```
npm run dev
```
