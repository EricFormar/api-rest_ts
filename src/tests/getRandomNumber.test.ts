import { describe, expect, it } from "vitest";
import { getRandomNumber } from "../utils/getRandomNumber";

describe('getRandomNumber', () => {
    it('should return a random number', () => {
        const randomNumber = getRandomNumber(1,10);
        expect(randomNumber).toBeGreaterThanOrEqual(1);
        expect(randomNumber).toBeLessThanOrEqual(10);
    });

    it('should return the same number if min and max are the same', () => {
        const randomNumber = getRandomNumber(5,5);
        expect(randomNumber).toBe(5);
    });

    it('should return the min number if min is greater than max', () => {
        const randomNumber = getRandomNumber(10,5);
        expect(randomNumber).toBeGreaterThanOrEqual(5);
        expect(randomNumber).toBeLessThanOrEqual(10);   
    })
})