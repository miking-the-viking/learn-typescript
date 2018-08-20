
/**
 * Stack Data Type implementation of GenericList Tests
 */

import { Stack } from "../../src/GenericLists/Stack";

describe('Custom Stack Data Type:', () => {
    let myStack: Stack<number>; // is a Stack of numbers

    
    describe('pop()', () => {
        beforeAll(() => {
            myStack = new Stack<number>();
        });
        
        it('Returns undefined when calling `pop` from an empty Stack', () => {
            expect(myStack.items).toHaveLength(0);
            expect(myStack.pop()).toBeUndefined();
            expect(myStack.items).toHaveLength(0);
        });

        describe('A populated Stack:', () => {

            beforeEach(() => {
                myStack = new Stack<number>([1, 2, 3, 4]);
            });

            it('Returns the LAST item in the Stack, until the Stack is EMPTY then UNDEFINED.', () => {
                for (let i = 0; i < 4; i ++) {
                    expect(myStack.pop()).toEqual(4 - i);
                    expect(myStack.items).toHaveLength(4 - (i + 1));
                }
                expect(myStack.pop()).toBeUndefined();
            });
        });

    });

    describe('push()', () => {
        beforeEach(() => {
            myStack = new Stack<number>();
        });
        
        it('Appends each new list item to the END of the Stack, returning the new length of the Stack', () => {
            expect(myStack.items).toHaveLength(0);
            for (let i = 0; i < 30; i ++){
                expect(myStack.push(i)).toEqual(i + 1);
                expect(myStack.items[i]).toEqual(i);
            }
            expect(myStack.items).toHaveLength(30);
        });

    });

});