
/**
 * Queue Data Type Tests implementation of GenericList Tests
 * 
 * A Queue should follow the order of First In First Out
 */

import { Queue } from "../../src/GenericLists/Queue";

describe('Queue<number> Data Type:', () => {
    let myQueue: Queue<number>; // is a queue of numbers

    beforeAll(() => {
        myQueue = new Queue<number>();
    });
    
    describe('pop()', () => {
        
        it('Returns undefined when calling `pop` from an empty Queue', () => {
            expect(myQueue.items).toHaveLength(0);
            expect(myQueue.pop()).toBeUndefined();
            expect(myQueue.items).toHaveLength(0);
        });

        describe('A populated Queue:', () => {

            beforeAll(() => {
                myQueue = new Queue<number>([1, 2, 3]);
            });

                it('Returns the FIRST item in the Queue, until the Queue is EMPTY then UNDEFINED.', () => {
                    for (let i = 0; i < 3; i ++) {
                        expect(myQueue.pop()).toEqual(i + 1);
                        expect(myQueue.items).toHaveLength(3 - (i + 1));
                    }
                    expect(myQueue.pop()).toBeUndefined();
                });
        });

    });

    describe('push()', () => {
        beforeEach(() => {
            myQueue = new Queue<number>();
        });
        
        it('Appends each new list item to the END of the Queue, returning the NEW LENGTH of the Queue', () => {
            expect(myQueue.items).toHaveLength(0);
            
            for (let i = 0; i < 5; i++) {
                expect(myQueue.push(i)).toEqual(i + 1);
                expect(myQueue.items[i]).toEqual(i);
                expect(myQueue.items).toHaveLength(i + 1);
            }
        });

    });

});