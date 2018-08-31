import { IGenericList } from './GenericList';
/**
 * Generic Tree List Abstracts
 */
import { GenericList } from './GenericList';

export interface IGenericNode<T> {
    value: T;
}

export abstract class GenericNode<T> {
    constructor(public readonly value: T) { }
}

export interface IGenericTreeList<T> {
    root: IGenericNode<T> | null;
}

export abstract class GenericTreeList<T> extends GenericList<T> implements IGenericList<T> {
    public root: GenericNode<T> | null = null;

    constructor() {
        super();
    }

    public peek(): T | undefined {
        console.log('Peeking at the root of the tree now, yah knob');
        return undefined;
    }
}