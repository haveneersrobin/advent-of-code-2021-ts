// --- Day 1: Sonar Sweep ---
// Started at: 19:36
import fs from 'fs';
/**
 * Part 1
 */
const stringToNumbersArray = (text) => text.split('\n').map(el => parseInt(el, 10));
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
var Specifier;
(function (Specifier) {
    Specifier["INCREASE"] = "increased";
    Specifier["DECREASE"] = "decreased";
    Specifier["EQUAL"] = "equal";
    Specifier["NA"] = "N/A - no previous measurement";
})(Specifier || (Specifier = {}));
const didIncreaseOrDecrease = (secondNumber, firstNumber) => {
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
const checkInput = (input) => {
    let increases = 0;
    input.forEach((number, index) => {
        if (didIncreaseOrDecrease(number, index > 0 ? input[index - 1] : undefined) === Specifier.INCREASE) {
            increases++;
        }
    });
    return increases;
};
const readTextInput = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return stringToNumbersArray(data.toString());
    }
    catch (e) {
        console.error('Error:', { e });
    }
    return [];
};
// console.log(checkInput(readTextInput('input.txt')));
/**
 * End of Part 1
 */
/**
 * Part 2
 */
const sumWithTwoNextElements = (index, input) => index < input.length - 2 ? input[index] + (input[index + 1] || 0) + (input[index + 2] || 0) : undefined;
const checkInputSlidingWindow = (input) => {
    const mappedArray = input.map((_, index) => sumWithTwoNextElements(index, input)).filter(Boolean);
    let increases = 0;
    mappedArray.forEach((number, index) => {
        if (didIncreaseOrDecrease(number, index > 0 ? mappedArray[index - 1] : undefined) === Specifier.INCREASE) {
            increases++;
        }
    });
    return increases;
};
console.log(checkInputSlidingWindow(readTextInput('input.txt')));
/**
 * End of Part 2
 */
