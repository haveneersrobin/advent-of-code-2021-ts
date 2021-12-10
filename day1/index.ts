// --- Day 1: Sonar Sweep ---
// Started at: 19:36

import { stringToNumbersArray, readInputFromPath } from '../helpers.js';

/**
 * Part 1
 */
const exampleInput = stringToNumbersArray(`199
200
208
210
200
207
240
269
260
263`);
enum Specifier {
  INCREASE = 'increased',
  DECREASE = 'decreased',
  EQUAL = 'equal',
  NA = 'N/A - no previous measurement',
}

const didIncreaseOrDecrease = (secondNumber?: number, firstNumber?: number): Specifier | undefined => {
  if (!secondNumber) {
    return;
  }
  if (!firstNumber) {
    return Specifier.NA;
  }
  if (secondNumber >= firstNumber) {
    if (secondNumber > firstNumber) {
      return Specifier.INCREASE;
    }
    return Specifier.EQUAL;
  }
  return Specifier.DECREASE;
};

const checkInput = (input: number[]) => {
  let increases = 0;
  input.forEach((number, index) => {
    if (didIncreaseOrDecrease(number, index > 0 ? input[index - 1] : undefined) === Specifier.INCREASE) {
      increases++;
    }
  });
  return increases;
};

console.log(checkInput(exampleInput));
console.log(checkInput(stringToNumbersArray(readInputFromPath('input.txt'))));

/**
 * End of Part 1
 */

/**
 * Part 2
 */
const sumWithTwoNextElements = (index: number, input: number[]) =>
  index < input.length - 2 ? input[index] + (input[index + 1] || 0) + (input[index + 2] || 0) : undefined;

const checkInputSlidingWindow = (input: number[]) => {
  const mappedArray = input.map((_, index) => sumWithTwoNextElements(index, input)).filter(Boolean);
  let increases = 0;
  mappedArray.forEach((number, index) => {
    if (didIncreaseOrDecrease(number, index > 0 ? mappedArray[index - 1] : undefined) === Specifier.INCREASE) {
      increases++;
    }
  });
  return increases;
};

console.log(checkInputSlidingWindow(exampleInput));
console.log(checkInputSlidingWindow(stringToNumbersArray(readInputFromPath('input.txt'))));

/**
 * End of Part 2
 */

// Finished at: 20:22
