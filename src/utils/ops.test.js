import { sum } from './ops';

describe('Function sum', () => {
  test('handles integers', () => {
    // arrange
    const argOne = 89;
    const argTwo = 50;
    const expectedSum = argOne + argTwo;
    // act
    const result = sum(argOne, argTwo);
    // assert
    expect(result).toBe(expectedSum);
  });

  test('handles floats', () => {
    const argOne = 5.6;
    const argTwo = 1.2;
    const expectedSum = argOne + argTwo;
    const result = sum(argOne, argTwo);
    expect(result).toBe(expectedSum);
  });

  test('handles string', () => {
    const argOne = '4.5';
    const argTwo = '7';
    const expectedSum = Number.parseFloat(argOne) + Number.parseFloat(argTwo);
    const result = sum(argOne, argTwo);
    expect(result).toBe(expectedSum);
  });

  test('handles non-numeric string', () => {
    const argOne = 'abc';
    const argTwo = 6;
    const expectedSum = 0 + argTwo;
    const result = sum(argOne, argTwo);
    expect(result).toBe(expectedSum);
    const result2 = sum(argTwo, argOne);
    expect(result2).toBe(expectedSum);
  });
});
