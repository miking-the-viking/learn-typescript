/**
 * Symbols are a primitive data type created by calling the `Symbol()` constructor
 */

let sym1 = Symbol();

let sym2 = Symbol("key");   // optional string key

// each symbol is immutable and unique
let sym3 = Symbol("key");

sym2 === sym3;  //false, they are unique primitive data type