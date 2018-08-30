/**
 * Decorators are a special kind of declaration that can be attached to:
 *  - class declaration
 *  - method
 *  - accessor
 *  - property
 *  = parameter
 * 
 * Decorators use the form `@expression` where expression must evaluate to a function that will be called at runtime with information about the decorated delcaration
 * 
 * Decorators are evaluated in the following order:
 *  - Parameter Decorators, then Method, Accessor, or Property Decorators for each instance member
 *  - Parameter Decorators, then Method, Accessor, or Property Decorators for each static member
 *  - Parameter Decorators are applied for the constructor
 *  - Class Decorators are applied for the class
 */

import "reflect-metadata";


 /**
  * Class Decorator
  * 
  * Declared just before the class declaration. The class decorator is applied ot the constructor of the class and can be used to observe, modify, or replace a class definition.
  * 
  * If a class decorator returns a value, it will replace the class declaration with the provided constructor function.
  */
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(): string {
        return "Hello, " + this.greeting;
    }
}

// sealed call Object.seal to seal both the constructor and its prototype (preventing new properties from being added to them)
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}



// overriding the construcvtor
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter2 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter2("world"));


/**
 * Method Decorators
 * 
 * Declared just before a method declaration.
 * The decorator is applied to the Property Descriptor for the method and can be used to observe, modify or replace a method definition.
 * A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context.
 * 
 * The expression for a method decorator will be called as a function at runtime, with the following three arguments:
 * 
 *   - The constructor function of the class for a static member, OR the prototype of the class for an instance member
 *   - The name of the member
 *   - The Property Descriptor for the member
 * 
 * If the method decorator returns a value, it will be used as the Property Descriptor for the method
 */

class Greeter3 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @debounce(100, true)
    // @enumerable(false)
    // @modifyOutput('bitch')
    greet() {
        const message = "Hello, " + this.greeting;
        console.log(message);
        return message;
    }

    rapidFireGreet(){
        for (let i = 0; i < 20; i++) {
            console.log('rapidFireGreet calling Greet! ' + i);
            this.greet();
        }
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('enumerable function');
        console.log(value);
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        descriptor.enumerable = value;
    };
}

function modifyOutput(value: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('modifyOutput function');
        descriptor.value = () => { return 'bitch'; };
    }
}

const debounceMetadataKey = Symbol("debounce");

function debounce(wait:number, immediate:boolean=false) {
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        var timeout:any;
        var originalMethod = descriptor.value;
        descriptor.value = function() {
            var context = this
            var args = arguments;
            console.log(Reflect);
            console.log('calling original method');
            addToDebounceQueue('test', context, args);
            originalMethod.apply(context, args);
        }
        return descriptor;
    }
};

function addToDebounceQueue(callback: string, context: any, args: any) {
    console.log('adding to debounceQueue');
    Reflect.metadata(debounceMetadataKey, callback);
    console.log(Reflect);
    console.log(Reflect.getMetadata(debounceMetadataKey, Reflect, ))
}

function popFromDebounceQueue() {
    const origQueue = Reflect.getMetadata(Reflect, 'debounceQueue')
    let newQueue = origQueue;
    if (origQueue && origQueue.length > 0) {
        newQueue.splice(1)[0]();
    }
    Reflect.metadata(Reflect, 'debouceQueue');
}

const greeter3 = new Greeter3('test');

console.log(greeter3.greet());
console.log('----');
console.log(greeter3.rapidFireGreet());