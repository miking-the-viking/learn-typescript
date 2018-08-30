
/**
 * Definitions for a GenericList
 */
export interface IGenericListConstructor<T> {
    new (val?: T | T[]): IGenericList<T>;
    (val?: T | T[]): IGenericList<T>;
}

/**
 * Interface defining the GenericList type
 */
export interface IGenericList<T> {
    pop(): T | undefined;
    push(x: T): number;
    peek(): T | undefined;
}

/**
 * GenericList is an abstract class defining a Generic List that has the abstract functions pop and push, and an array of items.
 */
export abstract class GenericList<T> implements IGenericList<T> {

    /**
     * pop will remove and return T if the items array is non-empty, otherwise undefined
     */
    abstract pop(): T | undefined ;

    /**
     * insert a value into the items array
     * @param x value to put into the items array
     */
    abstract push(x: T): number;

    public peek(): T | undefined{
        console.log('There ain\'t nothing to bloody peek at yet ya knob!')
        return undefined;
    }
}