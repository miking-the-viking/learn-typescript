/**
 * Generics are the pillar of functional reusability, allowing the creation of a component tat can work over a variety of types instead of just one.
 * https://www.typescriptlang.org/docs/handbook/generics.html
 */

function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");  // type of output will be 'string'. BY EXPLICIT TYPE DECLARATION

let output2 = identity("myString");  // type of output2 will be 'string'. BY TYPE INFERENCE
