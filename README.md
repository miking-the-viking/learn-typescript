# Typescript Project Demo

This repo is a step by step implementation of a Typescript project and the various benefits therein.

    This tutorial aims for a low barrier to entry; it may be quite verbose, the goal is that anyone of any level can learn something from this demo.

A rough project map would include:

- Project Setup
    - Git
        - `.gitignore`
    - Node
        - `package.json`
    - Environment Vars
    - Typescript
        - `tsconfig`
        - `tslint`
        - `ts-node`
        - `ts-jest`
    - Nodemon
    - Testing Framework Configuration using Jest
    - Build Configuration using Webpack
- OOP
    - Interfaces
    - Classes
    - Generics
    - Decorators
- Tests
    - Mocking
    - E2E (after Docker?)
- Docker
    - Setup
        - `dockerfile`
        - `docker-compose.yaml`
    - Usage
    	- `make`
    	- `docker-compose`
  	- Database
    	- Cassandra (NoSQL)
    	- Postgres/MySQL (SQL)
  	- Node Microservice
    	- NestJS
    	- GraphQL
- Front End Framework
  	- Select one!
    	- Vue ?
    	- React ?
  	- Redux/Vuex State management
  	- Vue-Router/React-Router SPA Routing
- Front End Testing
- E2E Testing
- Deployment (tbd)

## Project Setup

Set up your project to use git version control, node, configurable environment variables, Typescript, webpack and nodemon.

It is assumed that the following are already installed on your system:

- Git
- Node
- Docker

	You can also use `yarn` instead of `npm` for a Node Package Manager. Don't feel limited just because one or the other is used in this one.

If you are using windows, ensure that Windows Subsystem for Linux is enabled as Linux-sytle commands and configurations will be used.

### Git Follow-Along

This demonstration will have very informative documentation and concise commits demonstrating each topic that you can quickly jump through.

1. Clone this repo
2. Checkout any commit id to see the relevant code changes

### Step 1. Setting up Git

If you're serious about your project, the first thing that you should do is configure the version control for your project. Even if the project is far along its lifeline: it's never _too_ late to start version controlling your software!

In your project directory call `git init`, configure the `remote` to point to whatever remote Git repository you desire.

	For Privacy, BitBucket is unlimited free tier.
	For Public, GitHub is unlimited free tier.

	There is also GitLab, VSTS, and many more! Each with their own perks and drawbacks.

#### `.gitignore`

Setup your `.gitignore` file to ensure that Git ignores any unnecessary files/directories like `node_modules`, `.env`, optimized images, scratch work, generated files, etc.

#### Environment Variables

Create a `.env.example` to be the source of truth as to what environment variables will be required within your application; whether it be a node application, docker container orchestration, database configuration, etc. The first step of starting up an application should be to copy its `.env.example` into a local `.env` that can be populated to your specific environment's purpose and constraints.

In this case the `.env.example` is only being created with one parameter: `NODE_ENV='development'`. Copy this file into `.env` to start configuring your local project (at present there is not much, but this will change).

### Step 2. Setup Node Project

Create a folder in your root project folder that will contain your node project. In this demo it the folder will be called `node`.

Call `yarn init` in the `node` project folder to initialize your Node project and generate the necessary `package.json` to contain information about the Node project, executable scripts, dependencies (production & developmental), and other various project configurations.

#### Install Typescript and TS Lint

Once Typescript is installed globally using `yarn add typescript && yarn add -D tslint`, it can compile a `.ts` file by using `tsc`.

	`tsc main.ts`

While you're at it, `yarn add -D ts-node jest ts-jest @types/jest tsconfig-paths`

##### Generate `.tsconfig.json`

Call `tsc --init` to autogenerate a `tsconfig.json`, this is the configuration object for how Typescript behaves. Typescript explicitly defines it enforces so you'll likely find yourself customizing this file to your individual project's needs.

In this case the main changes I've made are:

- `baseUrl` to be `./src` (where the source code of this node service will reside)
- `outDir` to be `./dist` (where compiled code will go)
- `target` to be `es6` (Access to more advanced features)

##### Generate `tslint.json`

Call `tslint --init` to autogenerate a `tslint.json`, this is the configuration object for linting your Typescript project. Just like with Typescript, you can customize the linter to your hearts content; although there are great, already established conventions out there already.

#### Install `nodemon` (Dev)

`nodemon` is much like pmw in that is runs your node application, monitoring for any code changes and/or crashes. Allowing your code to automatically restart on edit in development mode.

	`yarn add -D nodemon`

Create a `nodemon.json` to configure nodemon. A sample base is below:

```json
{
    "watch": [
	  "src",
	  "test"
    ],
    "ext": "ts",
    "ignore": [
      "src/**/*.spec.ts"
    ],
    "exec": "ts-node -r tsconfig-paths/register src/main.ts"
  }
```

Create a `src/` folder in the `node/` directory and a `main.ts`. Add the following scripts to your `package.json`:

```javascript
  "scripts": {
    "start": "ts-node -r tsconfig-paths/register src/main.ts",
    "start:dev": "nodemon"
  },
```

You can not start node script in either dev mode (with automatic recompilation/starting) using `yarn start:dev`, or you can start it normally using `yarn start`.

### Step 3: Setup Testing Framework

Add to the end of your package json the following basic configuration for jest:

```json
,
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
```

and the following scripts:

```json
    "test": "jest",
    "test:cov": "jest --coverage",
    "test:watch": "jest --watch",
```

Now you can run `yarn test` to run any jest tests in your project. In this configuration that works for any file following the pattern `*.(test|spect).(ts|js)`.

### Step 3: Setup Build Process

We'll use Webpack for building the distributable code, `yarn add -D webpack`.

Make a `webpack.config.json` in the root of the node project, a sibling of `package.json`.