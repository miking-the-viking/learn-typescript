/**
 * Generic Array List Abstracts
 */
import { GenericList } from './GenericList';

export interface IGenericArrayList<T> {
    items: T[];
}
export abstract class GenericArrayList<T> extends GenericList<T> implements IGenericArrayList<T> {
    public items: T[] = [];

    constructor(items?: T | T[] | undefined) {
        super();
        if (items instanceof Array) {
            this.items = items;
        } else if (items) {
            this.items.push(items);
        }
    }

    public peek(): T | undefined {
        console.log('Peeking at the next to come out of the Array List Implementation?');
        return undefined;
    }
}