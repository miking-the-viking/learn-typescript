
/**
 * Definitions for a GenericList
 */

/**
 * GenericList is an abstract class defining a Generic List that has the abstract functions pop and push, and an array of items.
 */
export abstract class GenericList<T> {

    /**
     * pop will remove and return T if the items array is non-empty, otherwise undefined
     */
    abstract pop(): T | undefined ;

    /**
     * insert a value into the items array
     * @param x value to put into the items array
     */
    abstract push(x: T): number;

    public peek(): T | void{
        console.log('There ain\'t nothing to bloody peek at yet ya knob!')
    }
}