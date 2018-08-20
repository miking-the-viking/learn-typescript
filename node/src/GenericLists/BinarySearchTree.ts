
/**
 * Implementation of a Binary Search Tree that extends GenericTreeList
 */

import { GenericNode, GenericTreeList } from './GenericTreeList';

/**
 * A Binary Search Tree has a Node of type T
 * A Node has a unique, ordered value in the Tree and nullable `left` and `right` properties pointing to other Node<T> or null
 */

export class Node<T> extends GenericNode<T>{

    public right: Node<T> | null;
    public left: Node<T> | null;

    constructor(public readonly val: T) {
        super(val);
        this.right = null;
        this.left = null;
    }
}

export enum POP_ORDER {
    LOWEST_TO_HIGHEST = 'LOWEST_TO_HIGHEST',
    HIGHEST_TO_LOWEST = 'HIGHEST_TO_LOWEST'
}

export class BinarySearchTree<T> extends GenericTreeList<T> {

    public root: Node<T> | null;
    public popOrder: POP_ORDER = POP_ORDER.LOWEST_TO_HIGHEST;

    constructor(val?: T | T[]) {
        super();
        if (val instanceof Array) {
            this.root = new Node<T>(val[0]);
            val.slice(1).map((val) => this.push(val));
        } else {
            this.root = null;
        }
    }

    /**
     * push pushes a new Node<T> onto the Binary Search Tree
     */
    public push(val: T) {
        if (!this.root) {
            this.root = new Node<T>(val);
            return 1;
        }

        // using recursive, unbalancing push implementation
        this.recursivePushBST(val, this.root);

        return this.inOrderTraversal().length;
    }

    /**
     * recursivePushBST is a helper function to recursively push a value onto the Binary Search Tree
     * @param val value to push
     * @param node root node (assumed to already be set in initial push)
     */
    private recursivePushBST(val: T, node: Node<T>) {
        if (val > node.value) {
            if (!node.right) {
                node.right = new Node<T>(val);
            } else {
                this.recursivePushBST(val, node.right);
            }
        } else if (val < node.value) {
            if (!node.left) {
                node.left = new Node<T>(val);
            } else {
                this.recursivePushBST(val, node.left);
            }
        }
    }

    /**
     * inOrderTraversal traverses the BST, printing out the nodes values in order from lowest to highest OR vice versa
     */
    public inOrderTraversal(node?: Node<T>, acc: T[] = new Array<T>()): T[] {
        if (!this.root) {
            return acc;
        }
        if (!node) {
            node = this.root;
        }

        if (node.left){
            acc = this.inOrderTraversal(node.left, acc);
        }
        acc.push(node.value);
        if (node.right) {
            acc = this.inOrderTraversal(node.right, acc);
        }
        return acc;
    }

    /**
     * Toggles the pop order
     */
    public togglePopOrder(order?: POP_ORDER) {
        if (order) {
            this.popOrder = order;
        } else if (this.popOrder === POP_ORDER.LOWEST_TO_HIGHEST) {
            this.popOrder = POP_ORDER.HIGHEST_TO_LOWEST;
        } else {
            this.popOrder = POP_ORDER.LOWEST_TO_HIGHEST;
        }
    }

    /**
     * pop pops either the lowest or largest elemnt from the BST
     */
    public pop(): T | undefined {
        if (!this.root) {
            return undefined;
        }
        if (this.popOrder === POP_ORDER.LOWEST_TO_HIGHEST) {
            return this.recursivePopLTH(this.root);
        } else {
            return this.recursivePopHTL(this.root);
        }
    }

    /**
     * search searches for and returns an array of node values to reach the desired node; including the node, or an empty array
     */
    public search(value: T, node: Node<T> | null = null): T[] {
        let returnArray: T[] = [];

        if (!this.root) return returnArray;

        if (!node) node = this.root

        if (value === node.value) {
            returnArray.push(node.value);
            return returnArray;

        } else if (value < node.value && node.left) {
            returnArray.push(...this.search(value, node.left));

        } else if (value > node.value && node.right) {
            returnArray.push(...this.search(value, node.right));

        }

        if (returnArray.length > 0) {
            returnArray.push(node.value);
        }

        return returnArray;
    }

    /**
     * peek returns the value of the next node to be popped without popping it, or null
     */
    public peek() {
        if (!this.root) {
            return null;
        }

        if (this.popOrder === POP_ORDER.LOWEST_TO_HIGHEST) {
            return this.recursivePeekLTH(this.root);
        } else {
            return this.recursivePeekHTL(this.root);
        }
    }

    private recursivePeekLTH(node: Node<T>): T | undefined {
        if (node.left) {
            return this.recursivePeekLTH(node.left);
        }
        return node.value;
    }

    private recursivePeekHTL(node: Node<T>): T | undefined {
        if (node.right) {
            return this.recursivePeekHTL(node.right);
        }
        return node.value;
    }
    
    private recursivePopLTH(node: Node<T>, parent: Node<T> | null = null): T | undefined {
        if (node.left) {
            return this.recursivePopLTH(node.left, node);
        } else {
            if (parent) {
                if (node.right) {
                    parent.left = node.right;
                } else {
                    parent.left = null;
                }
            } else {
                if (node.right) {
                    this.root = node.right;
                } else {
                    this.root = null;
                }
            }
            return node.value;
        }
    }

    private recursivePopHTL(node: Node<T>, parent: Node<T> | null = null): T | undefined {
        if (node.right) {
            return this.recursivePopHTL(node.right, node);
        } else {
            if (parent) {
                if (node.left) {
                    parent.right = node.left;
                } else {
                    parent.right = null;
                }
            } else {
                if (node.left) {
                    this.root = node.left;
                } else {
                    this.root = null;
                }
            }
            return node.value;
        }
    }

}