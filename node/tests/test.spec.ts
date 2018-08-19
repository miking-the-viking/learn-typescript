import { incrementBy1 } from "../src/main";

/**
 * Test the functionality of methods exported by main.ts
 */

describe('Main.ts', () => {

    describe('incrementBy1', () => {

        it('Returns a given number incremented by 1', () => {
            expect(incrementBy1(1)).toEqual(2);
        })

    });

});