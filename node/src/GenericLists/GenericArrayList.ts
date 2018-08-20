/**
 * Generic Array List Abstracts
 */
import { GenericList } from './GenericList';

export abstract class GenericArrayList<T> extends GenericList<T> {
    public items: T[] = [];

    constructor(items?: T | T[]) {
        super();
        if (items instanceof Array) {
            this.items = items;
        } else if (items) {
            this.items.push(items);
        }
    }

    public peek() {
        console.log('Peeking at the next to come out of the Array List Implementation?');
    }
}