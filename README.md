# Typescript Project Demo

## Heavily WIP (may be missing some documentation/steps)

This repo is a step by step implementation of a Typescript project and the various benefits therein.

	This tutorial aims for a low barrier to entry; it may be quite verbose, the goal is that anyone of any level can learn something from this demo.

A rough project map would include:

- [x] [Project Setup](./docs/project-setup.md)
	- [x] Git
		- [x] `.gitignore`
	- [x] Node
		- [x] `package.json`
	- [x] Environment Vars
	- [x] Typescript
		- [x] `tsconfig`
		- [x] `tslint`
		- [x] `ts-node`
		- [x] `ts-jest`
	- [x] Nodemon
	- [x] Testing Framework Configuration using Jest
	- [x] Build Configuration using Webpack
- [ ] OOP
	- [x] Interfaces
	- [x] Classes
	- [x] Generics
	- [ ] Decorators
- [x] Front End Framework
  	- Select one!
		- [x] Vue
			- [x] Using **Vue CLI 3**
			- [x] `pug` Templates
			- [x] TypeScript
			- [x] SCSS
			- [x] Vuex
			- [x] Vue Router
			- [x] Kickass Modern Vue Decorator Libraries
				- [x] [`Vuex-Module-Decorator`](https://github.com/championswimmer/vuex-module-decorators) [@championswimmer](https://github.com/championswimmer) _Revolutionize your life by writing Vuex Modules as Classes instead of JSON_
				- [x] [`Vue-Property-Decorator`](https://github.com/kaorun343/vue-property-decorator) _Revolutionize your Vue experience by writing Vue Classes instead of defining Vue Configurations_
		- [ ] React ? _another day..._
  	- [x] Redux/Vuex State management
  	- [x] Vue-Router/React-Router SPA Routing
- [x] Back End Framework
	- [x] NestJS
		- [x] GraphQL
			- [x] Query
			- [x] Mutation
			- [ ] Subscription (_Yet todo..._)
- [ ] Tests
	- [ ] Mocking
- [ ] Docker
	- [ ] Setup
		- [ ] `dockerfile`
		- [ ] `docker-compose.yaml`
	- [ ] Usage
		- [ ] `make`
		- [ ] `docker-compose`
	- [ ] Database
		- [ ] Cassandra (NoSQL)
		- [ ] Postgres/MySQL (SQL)
	- [ ] Node Microservice
		- [ ] NestJS
		- [ ] GraphQL
- [ ] Front End Testing
- [ ] E2E Testing
- [ ] Deployment (tbd)

## Doc Links

- [Project Setup](./docs/project-setup.md)
- [TypeScript](./docs/typescript.md)

## Setup the Server

We'll be using [NestJS](https://docs.nestjs.com/) for its amazing CLI, advanced features (GraphQL, etc.), and TypeScript support.

The project has been broken into two distinct codebases to prevent polluting backend/frontend application code:

- The front end application (`vue-app`), implementing a vue front end with the Vue CLI 3 proxying to the NestJS back end
- The back end application (`typescript-api-app`), built using NestJS and GraphQL

### Frontend Vue Application: `vue-app` 

Within the `vue-app/` resides the frontend application which handles the VueJS Application. In development mode it proxies the backend server requests thus allowing the development environment to interact with the back end application and GraphQL.

#### Running Vue-App

To start the live-reload development environment use:

	yarn serve

To build the front end application for production use:

	yarn build

#### Testing Vue-App

_todo_

### Backend NestJS/GraphQL Application: `typescript-api-app`

Within the `typescript-api-app/` resides the backend application which handles all the API requests, and ultimately serving pages.

#### Running Typescript-Api-App

To start the live-reload development environment use:

	yarn start:dev

To start the production server use:

	yarn start:prod

#### Testing Typescript-Api-App

To start the unit tests use:

	yarn test

To engage watch mode, and live-restart the tests:

	yarn test:watch

To start the E2E tests use:

	yarn test:e2e

To engage watch mode, and live-restart the tests:

	yarn test:e2e:watch

To run a coverage test use:

	yarn test:cov
