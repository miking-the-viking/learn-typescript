import { StackTree } from './../../src/GenericLists/StackTree';

/**
 * Stack Data Type implementation of GenericList Tests
 * 
 * A Stack should follow the order of First In Last Out
 */

import { GenericList, IGenericList } from "../../src/GenericLists/GenericList";
import { Stack } from "../../src/GenericLists/Stack";


const runStackTests = <T extends GenericList<number>>(ctor: new (...args: any[]) => IGenericList<number>, name: string, val?: number | number[] | undefined) => {
describe('Custom Stack Data Type (' + name + '):', () => {
    let myStack: IGenericList<number>; // is a Stack of numbers

    describe('pop()', () => {
        beforeAll(() => {
            myStack = new ctor();
        });

        it('Returns undefined when calling `pop` from an empty Stack', () => {
            expect(myStack.pop()).toBeUndefined();
        });

        describe('A populated Stack:', () => {

            beforeEach(() => {
                myStack = new ctor([1, 2, 3, 4]);
            });

            it('Returns the LAST item in the Stack, until the Stack is EMPTY then UNDEFINED.', () => {
                for (let i = 0; i < 4; i++) {
                    expect(myStack.pop()).toEqual(4 - i);
                }
                expect(myStack.pop()).toBeUndefined();
            });
        });

    });

    describe('push()', () => {
        beforeEach(() => {
            myStack = new ctor();
        });

        it('Appends each new list item to the END of the Stack, returning the new length of the Stack', () => {
            for (let i = 0; i < 30; i++) {
                expect(myStack.push(i)).toEqual(i + 1);
            }
        });

    });

});

}

runStackTests<Stack<number>>(Stack, 'Stack Array');
runStackTests<StackTree<number>>(StackTree, 'Stack Tree');