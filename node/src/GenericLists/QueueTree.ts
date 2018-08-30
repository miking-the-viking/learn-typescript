/**
 * Queue implemented with a GenericTreeList
 */

import { GenericNode, GenericTreeList } from './GenericTreeList';
import { IGenericList } from './GenericList';

export class QueueNode<T> extends GenericNode<T>{

    public next: QueueNode<T> | null;

    constructor(public readonly val: T) {
        super(val);
        this.next = null;
    }
}

export class QueueTree<T> extends GenericTreeList<T> implements IGenericList<T> {

    public root: QueueNode<T> | null;

    constructor(val?: T | T[]) {
        super();
        if (val instanceof Array) {
            this.root = new QueueNode<T>(val[0]);
            val.slice(1).map((val) => this.push(val));
        } else if (val) {
            this.root = new QueueNode<T>(val);
        } else {
            this.root = null;
        }
    }

    /**
     * Pushes a value onto the Queue, returning the Queue length
     * @param val 
     */
    public push(val: T, node: QueueNode<T> | null = null): number {
        if (this.root === null) {
            this.root = new QueueNode<T>(val);
            return 1;
        }
        return 1 + this.recursivePush(val, this.root);
    }

    private recursivePush(val: T, node: QueueNode<T>): number {
        if (node.next) {
            return 1 + this.recursivePush(val, node.next);
        }
        node.next = new QueueNode<T>(val);
        return 1;
    }

    /**
     * Pops a value from the front of the Queue
     */
    public pop() {
        if (this.root === null) {
            return undefined;
        }
        const res = this.root.value;
        if (this.root.next) {
            this.root = this.root.next;
        } else {
            this.root = null;
        }
        return res;
    }

    private count(node: QueueNode<T>, count = 0): number {
        if (node.next) {
            return 1 + this.count(node.next);
        }
        return 1;
    }

}
