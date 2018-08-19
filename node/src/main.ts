/**
 * Main Script for TypeScript Demo Node App
 */

const init = (): void => {
    console.log('Initializing main.ts');

    const x = 3;
}

init();

/**
 * Return a given number incremented by 1
 * @param x integer to increase by 1
 */
export function incrementBy1(x: number): number {
    return ++x;
}