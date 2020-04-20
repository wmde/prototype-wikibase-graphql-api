# prototype-wikibase-graphql-api
GraphQL API Prototyping April 2020

## Installation
Set the user-specific environment variables: `cp .env.example .env` and modify `.env` accordingly.

## Development

### GraphQL server
* Run `docker-compose run --rm node npm i` to install dependencies.
* Run `docker-compose up node` to start the server. You should see a message saying the server is running.

### GraphQL client demo
* Run `docker-compose run --rm client npm i` to install dependencies.
* Run `docker-compose up` to start the server and the client demo.
