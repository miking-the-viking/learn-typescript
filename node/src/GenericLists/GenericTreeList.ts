/**
 * Generic Tree List Abstracts
 */
import { GenericList } from './GenericList';

export abstract class GenericNode<T> {
    constructor(public readonly value: T) { }
}

export abstract class GenericTreeList<T> extends GenericList<T> {
    public root: GenericNode<T> | null = null;

    constructor() {
        super();
    }

    public peek() {
        console.log('Peeking at the root of the tree now, yah knob');
    }
}