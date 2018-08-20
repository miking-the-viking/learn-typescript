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

Now you can run `yarn test` to run any jest tests in your project. In this configuration that works for any file following the pattern `*.(test|spec).(ts|js)`.

### Step 3: Setup Build Process

We'll use Webpack for building the distributable code, `yarn add -D webpack`.

Make a `webpack.config.json` in the root of the node project, a sibling of `package.json`.

Now you can run `yarn build` to build distributable, production-ready js.

## TypeScript Features

TypeScript helps enhance the development and debugging experience by introducing static types to the JavaScript environment. This enhances JavaScript with the real benefits of OOP concepts such as: interfaces, classes, generics, and more!

### Interfaces, Classes, Abstract and Generics

Interfaces and Abstract classes enhance the OOP experience by allowing deeper abstract concepts to be applied to a codebase; providing enforcable contracts for custom data types and their implementations throughout a system and its tests.

I'll start in the abstract: envisioning a list class that can do 3 things (functions): `push`, `pop`, and `peek`.

    An `abstract class` is a `class` definition that *cannot be instantiated*. It must be implemented and extended by using the `extends` keyword in another `class` definition.
    Likewise an `abstract function` just lays out the framework for a function, it is not implemented and must be implemented; potentially by the `class` implementing the containing `abstract class`.

I then created the `abstract class GenericList<T>` which defines an `abstract class` that has two abstract functions `push(x: T)` and `pop()`; and one implemented function `peek()`. The implemented function can be called as-is in and class that extends the `GenericList`.

    _I'm actually going to squash two steps that I went through here in my development. At first I decided that the List Data Types to implement using the `GenericList` would be a `Queue` and a `Stack`, both easily implemented with arrays. So my first attempt only had this `abstract class GenericList` which also defined a property called `items` which was a `T[]`. This became too restrictive when I decided that I'd extend this into a Binary Search Tree for shits and giggles (thus needing a different data property than an array). So for this tutorial we'll go another level deeper with `abstract class`. I removed any defined property apart from based functionality from `GenericList`._

So we know what a `GenericList` can **DO**, but what does it **HAVE**? Well, _abstract classes can extend abstract classes_. For the initial List Data Types we'll implement; `Queue` and `Stack`, we can benefit from an `Array<T>`. So lets extend the `GenericList<T>` with `GenericArrayList<T>`, that does two things: defines a property on the `GenericArrayList<T>` called `items` that is an array of type `T`, and update the `peek()` abstract definition to be a little more explicit for an _array-based_ List Data Type.

Now we can implement the `GenericArrayList<T>`!

The `Stack<T>` List Data Type acts like a stack of plates, the order for pushing/popping is First-In-Last-Out. So the `pop()` and `push()` functions are implemented to achieve this in the `GenericArrayList`'s `items` array.
The `Queue<T>` List Data Type acts like a queue of people, the order for pushing/popping is First-In-First-Out. So the `pop()` and `push()` functions are implemented to achieve this in the `GenericArrayList`'s `items` array.

For the daring: you can try to implement a Binary Search Tree as a `GenericList<T>`.  To do so I extended the `GenericList<T>` with `GenericTreeList<T>`, similarly to how `GenericArrayList` was made: to setup the property containing the list values and to make the generic `peek()` message more specific to the implemented abstract class.

    A Binary Search Tree is defined by 1 value: the root node. Each node has a distinctly unique and sortable value, a nullable `left` (less than) node pointer and a nullable `right` (greater than) node pointer. A node's `left` pointer has any node that has a value that is less than this node; likewise a node's `right` pointer has any node that has a value that is greater than the node.

Obviously a `BinarySearchTree<T>` needs `Node<T>`, so to account for the potential of going crazy with different tree types lets also make a `GenericNode<T>` in the `GenericTreeList<T>` file. A `Node<T>` in a `BinarySearchTree<T>` has a `value<T>`, a nullable `left<Node<T>>` and a nullable `right<Node<T>>`.

`push(value: T)` pushes a value according to BST logic (without sorting... this initial stab is a recursive non-self-sorting algorithm).

- If there is no root
    - the root is a new node with the value being pushed. Return 1.
- Else
    - Recursively attempt to push the node into the tree starting at the root node.
    - Return the new node count.

`inOrderTraversal` was also implemented as a way to return all the elements as a sorted array.

`pop()` was implemented with a toggle function `togglePopOrder` and a new exported enum `POP_ORDER`, allowing for `LOWEST_TO_HIGHEST` or `HIGHEST_TO_LOWEST`, toggling the execution of the `pop()` function to either pop from the top, or pop from the bottom. Using the following algorithm:

- If there is no root, return undefined.
- Using a recursive function checking a node and passing its parent node for reference, determine if that is the node to be removed from the Binary Search Tree.

`search()` was also implemented. It will search for a given value in the Binary Search Tree and return the path to the sought value as an array from the value to the root.

Tests have been implemented demonstrating the accuracy of each of the different implementations of a `GenericList<T>`. Some todos for later would be better efficiencies. Maybe the Stack and/or Queue using the `GenericTreeList` instead of the `GenericArrayList`?