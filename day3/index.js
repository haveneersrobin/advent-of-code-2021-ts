import { readInputFromPath } from './../helpers.js';
/**
 * Part 1
 */
const exampleInput = `00100
 11110
 10110
 10111
 10101
 01111
 00111
 11100
 10000
 11001
 00010
 01010`;
const processAndTransposeInput = (input) => {
    const arrayOfStrings = input.split('\n').map(str => str.trim());
    const zeroBitCount = new Array(arrayOfStrings[0].length - 1).fill(0);
    const oneBitCount = new Array(arrayOfStrings[0].length - 1).fill(0);
    arrayOfStrings.map(string => {
        string.split('').map((bit, column) => {
            bit === '0'
                ? (zeroBitCount[column] = (zeroBitCount?.[column] || 0) + 1)
                : (oneBitCount[column] = (oneBitCount?.[column] || 0) + 1);
        });
    });
    return { zeroBitCount, oneBitCount };
};
const getGammaRate = (zeroBitCount, oneBitCount) => {
    let resultString = '';
    zeroBitCount.forEach((el, index) => (resultString += el > oneBitCount[index] ? '0' : '1'));
    return resultString;
};
const invert = (input) => input
    .split('')
    .map(el => (el === '0' ? '1' : '0'))
    .join('');
const toDecimal = (binaryInput) => parseInt(binaryInput, 2);
const calculatePrintResult = (input) => {
    const { zeroBitCount, oneBitCount } = processAndTransposeInput(input);
    const gammaRate = getGammaRate(zeroBitCount, oneBitCount);
    const epsilonRate = invert(gammaRate);
    const result = { gamma: toDecimal(gammaRate), epsilon: toDecimal(epsilonRate) };
    return { ...result, powerConsumption: result.gamma * result.epsilon };
};
console.log(calculatePrintResult(exampleInput));
console.log(calculatePrintResult(readInputFromPath('./input.txt')));
/**
 * Part 2
 */
