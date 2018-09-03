/**
 * Stack implementation with a GenericTreeList
 */
import { GenericNode, GenericTreeList } from './GenericTreeList';
import { IGenericList } from './GenericList';

export class StackNode<T> extends GenericNode<T>{

    public next: StackNode<T> | null;

    constructor(public readonly val: T) {
        super(val);
        this.next = null;
    }
}

export class StackTree<T> extends GenericTreeList<T> implements IGenericList<T> {

    public root: StackNode<T> | null;

    constructor(val?: T | T[]) {
        super();
        if (val instanceof Array) {
            this.root = new StackNode<T>(val[0]);
            val.slice(1).map((val) => this.push(val));
        } else if (val) {
            this.root = new StackNode<T>(val);
        } else {
            this.root = null;
        }
    }

    /**
     * Pushes a value onto the Stack, returning the Stack length
     * @param val 
     */
    public push(val: T, node: StackNode<T> | null = null): number {
        if (!this.root) {
            this.root = new StackNode<T>(val);
            return 1;
        }
        return 1 + this.recursivePush(val, this.root);
    }

    private recursivePush(val: T, node: StackNode<T>): number {
        if (node.next) {
            return 1 + this.recursivePush(val, node.next);
        }
        node.next = new StackNode<T>(val);
        return 1;
    }

    /**
     * Pops a value from the front of the Stack
     */
    public pop() {
        if (!this.root) {
            return undefined;
        }
        const res = this.root.value;

        if (this.root.next) {
            //recursive call & return
            return this.popRecursive(this.root.next, this.root);
        } else {
            //return this root and set it to null
            this.root = null;
        }
        return res;
    }

    private popRecursive(node: StackNode<T>, parentNode: StackNode<T>): T {
        if (!node.next) {
            const res = (parentNode.next as StackNode<T>).value;
            parentNode.next = null;
            return res;
        } else {
            return this.popRecursive(node.next, node);
        }
    }

    private count(node: StackNode<T>, count = 0): number {
        if (node.next) {
            return 1 + this.count(node.next);
        }
        return 1;
    }

}
