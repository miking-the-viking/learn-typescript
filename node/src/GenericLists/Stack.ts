
/**
 * Stack is a Generic implementation of a GenericArrayList as a Stack (Last In First Out)
 */

import { GenericArrayList } from "./GenericArrayList";

/**
 * Generic Stack of type T
 */
export class Stack<T> extends GenericArrayList<T> {

    /**
     * Pop removes and returns the last item in the array, or undefined
     */
    pop() {
        return this.items.pop();
    }

    /**
     * Push pushes a given item onto the end of the array
     * @param x 
     */
    push(x: T) {
        return this.items.push(x);
    }

    /**
     * Returns the next item from the Stack without removing it, or null
     */
    peek() {
        return this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
    }
}