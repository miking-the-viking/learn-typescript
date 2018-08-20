
/**
 * Binary Search Tree is a unqiue implementation that's unqiuely ordered
 */

import { BinarySearchTree, POP_ORDER } from "../../src/GenericLists/BinarySearchTree";

describe('Binary Search Tree of Number implementation of Generic Lists', () => {

    let bst: BinarySearchTree<number>;

    beforeEach(() => {
        bst = new BinarySearchTree<number>();
    });

    describe('pushing', () => {

        it('pushes nodes in the correct tree sorted order', () => {
            bst.push(5);
            bst.push(1);
            bst.push(8);
            bst.push(7);
            bst.push(100);
            bst.push(2);

            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7, 8, 100]);
            expect(bst.root).toBeDefined();
            expect(bst.root.value).toEqual(5);
            expect(bst.root.left).toBeDefined();
            expect(bst.root.left.value).toEqual(1);
            expect(bst.root.left.right).toBeDefined();
            expect(bst.root.left.right.value).toEqual(2);
            expect(bst.root.right).toBeDefined();
            expect(bst.root.right.value).toEqual(8);
            expect(bst.root.right.left).toBeDefined();
            expect(bst.root.right.left.value).toEqual(7);
            
        });

        it('never pushes the same value twice', () => {
            const MAX_LOOPS = 300;
            const MAX_NUM = 50;
            for (var i = 0; i < MAX_LOOPS; i++) {
                bst.push(i % MAX_NUM);
            }

            expect(bst.inOrderTraversal().length).toEqual(MAX_NUM);

            expect(
                bst
                    .inOrderTraversal()
                    .reduce(
                        (prevVal, currVal, currIndex, arr) => prevVal || (currIndex === 0 ? currVal === arr[currIndex + 1] : currVal === arr[currIndex - 1]),
                        false
                    )
            ).toBeFalsy();

        });

    });

    describe('popping in a specified order', () => {
        it('pops lowest to highest', () => {

            bst.push(5);
            bst.push(1);
            bst.push(8);
            bst.push(7);
            bst.push(100);
            bst.push(2);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7, 8, 100]);

            bst.togglePopOrder(POP_ORDER.LOWEST_TO_HIGHEST);

            expect(bst.pop()).toEqual(1);
            expect(bst.inOrderTraversal()).toEqual([2, 5, 7, 8, 100]);
            expect(bst.pop()).toEqual(2);
            expect(bst.inOrderTraversal()).toEqual([5, 7, 8, 100]);
            expect(bst.pop()).toEqual(5);
            expect(bst.inOrderTraversal()).toEqual([7, 8, 100]);
        });

        it('pops highest to lowest', () => {

            bst.push(5);
            bst.push(1);
            bst.push(8);
            bst.push(7);
            bst.push(100);
            bst.push(2);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7, 8, 100]);

            bst.togglePopOrder(POP_ORDER.HIGHEST_TO_LOWEST);

            expect(bst.pop()).toEqual(100);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7, 8]);
            expect(bst.pop()).toEqual(8);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7]);
            expect(bst.pop()).toEqual(7);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5]);
        });
    });


    describe('search', () => {

        it('searches and returns an empty array when the sought result wasn\'t there', () => {
            bst.push(5);
            bst.push(1);
            bst.push(8);
            bst.push(7);
            bst.push(100);
            bst.push(2);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7, 8, 100]);

            expect(bst.search(6)).toEqual([]);
        });

        it('searches and returns an array of the path from the sought node back to the root', () => {
            bst.push(5);
            bst.push(1);
            bst.push(8);
            bst.push(7);
            bst.push(100);
            bst.push(2);
            expect(bst.inOrderTraversal()).toEqual([1, 2, 5, 7, 8, 100]);

            expect(bst.search(100)).toEqual([100, 8, 5]);
            expect(bst.search(7)).toEqual([7, 8, 5]);
            expect(bst.search(2)).toEqual([2, 1, 5]);
            expect(bst.search(5)).toEqual([5]);
        });

    });

    describe('peek', () => {

        it('returns the next element that will be popped, without removing that element when popping Highest To Lowest', () => {
            
            bst.togglePopOrder(POP_ORDER.HIGHEST_TO_LOWEST);

            for (let i = 0; i < 10; i++) {
                bst.push(i);
            }

            while(bst.root !== null) {
                expect(bst.peek()).toEqual(bst.pop());
            }

        });

        it('returns the next element that will be popped, without removing that element when popping Lowest To Highest', () => {

            bst.togglePopOrder(POP_ORDER.LOWEST_TO_HIGHEST);

            for (let i = 0; i < 10; i++) {
                bst.push(i);
            }

            while(bst.root !== null) {
                expect(bst.peek()).toEqual(bst.pop());
            }

        });

    });
});