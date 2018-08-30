
/**
 * Queue Data Type Tests implementation of GenericList Tests
 * 
 * Defines a function `runQueueTests` that encloses all the tests, generically calling the typed constructor, name and its arguments are `runQueueTests` parameters
 * This permits the definition of a single set of tests to satisfy the basic requirements of an abstract class in its extended classes overrides
 */

import { Queue } from "../../src/GenericLists/Queue";
import { QueueTree} from "../../src/GenericLists/QueueTree";
import { IGenericList, GenericList, IGenericListConstructor } from "../../src/GenericLists/GenericList";

const runQueueTests = <T extends GenericList<number>>(ctor: new(...args: any[]) => IGenericList<number>, name: string, val?: number | number[] | undefined) => {
    describe('Generic List Test Queue Data Types (' + name + '): ', () => {
        let myGenericQueue: IGenericList<number>; // is a queue of numbers
    
        beforeAll(() => {
            myGenericQueue = new ctor();
        });
        
        describe('pop()', () => {
            it('Returns undefined when calling `pop` from an empty Queue', () => {
                expect(myGenericQueue.pop()).toBeUndefined();
            });
    
            describe('A populated Queue:', () => {
    
                beforeAll(() => {
                    myGenericQueue = new ctor();
                });
    
                it('Returns the FIRST item in the Queue, until the Queue is EMPTY then UNDEFINED.', () => {
                    for (let i = 0; i < 3; i ++) {
                        expect(myGenericQueue.push(i)).toEqual(i + 1);
                    }

                    for (let i = 0; i < 3; i ++) {
                        expect(myGenericQueue.pop()).toEqual(i);
                    }
                    expect(myGenericQueue.pop()).toBeUndefined();
                });
            });
    
        });
    
        describe('push()', () => {
            beforeEach(() => {
                myGenericQueue = new ctor();
            });
            
            it('Appends each new list item to the END of the Queue, returning the NEW LENGTH of the Queue', () => {
                for (let i = 0; i < 5; i++) {
                    expect(myGenericQueue.push(i)).toEqual(i + 1);

                    // implement a peekLast method?
                }
            });
    
        });
    
    });

}

/**
 * Note the types defines to be Queue and QueueTree, two separate implementations of a "Queue" class
 * implementing two completely different abstract classs extended from GenericList<T> - GenericArrayList<T> and GenericTreeList<T>, respectively.
 * 
 * Also note passing in the constructor as an arg. The constructor in the arg with its subsequent typedef of a IGenericList allow instances
 * of classes implementing IGenericList to be passed in, used and safely typed (in the context of all that is certain is the concept of pop and push)
 * 
 * 
 * runQueueTests is defines to accept a type "T extends GenericList<number>".
 * The abstract class "GenericList<T>" ultimately defines two abstract functions that will be implemented by a class, or an abstract class.
 * 
 * Since we are providing types to runQueueTests, we are defining the type T to be an implementation of a GenericList
 * (ie. has function pop(): T | undefined and push(x: T): number)
 * 
 * This allows safely calling pop() and push(x) in the method body on a variable defined to be of an IGenericList type :D
 * 
 * 
 * Using the exact same test suite defined for the function runQueueTests
 */

runQueueTests<Queue<number>>(Queue, 'Queue with Array');

runQueueTests<QueueTree<number>>(QueueTree, 'Queue with Tree');