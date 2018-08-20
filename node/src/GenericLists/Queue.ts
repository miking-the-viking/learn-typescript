
/**
 * Queue is the Generic implementation of a GenericArrayList as a Queue (First In First Out)
 */

import { GenericArrayList } from "./GenericArrayList";

/**
 * Generic Queue implementation of type T
 */
export class Queue<T> extends GenericArrayList<T> {

    /**
     * Removes and returns the first item from the Queue, or undefined
     */
    pop() {
        const removedItem = this.items.splice(0, 1);
        if (removedItem.length === 0) {
            return undefined;
        }
        return removedItem[0];
    }

    /**
     * Appends an item to the Queue, returns the new length
     * @param x 
     */
    push(x: T) {
        return this.items.push(x);
    }

    /**
     * Returns the next item from the Queue without removing it, or null
     */
    peek() {
        return this.items.length > 0 ? this.items[0] : null;
    }

}
