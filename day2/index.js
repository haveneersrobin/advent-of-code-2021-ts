import { readInputFromPath } from './../helpers.js';
/**
 * Part 1
 */
const exampleInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
const initialPosition = {
    horizontal: 0,
    depth: 0,
};
const getChange = ([command, offset], position) => {
    switch (command) {
        case 'forward':
            return { horizontal: position.horizontal + offset };
        case 'down': {
            return { depth: position.depth + offset };
        }
        case 'up': {
            return { depth: position.depth - offset };
        }
    }
};
const reduceCommand = (previousPosition, currentChange) => ({
    ...previousPosition,
    ...getChange(currentChange, previousPosition),
});
const processCommand = (inputs, initialPosition) => {
    const result = inputs.reduce(reduceCommand, initialPosition);
    return result.depth * result.horizontal;
};
const processInput = (input) => input
    .split('\n')
    .map(s => s.split(' '))
    .map(el => [el[0], parseInt(el[1], 10)]);
console.log(processCommand(processInput(exampleInput), initialPosition));
console.log(processCommand(processInput(readInputFromPath('./input.txt')), initialPosition));
const newInitialPosition = {
    horizontal: 0,
    depth: 0,
    aim: 0,
};
const getChangeModified = ([command, offset], position) => {
    switch (command) {
        case 'forward':
            return { horizontal: position.horizontal + offset, depth: position.depth + position.aim * offset };
        case 'down': {
            return { aim: position.aim + offset };
        }
        case 'up': {
            return { aim: position.aim - offset };
        }
    }
};
const reduceNewCommands = (previousPosition, currentChange) => ({
    ...previousPosition,
    ...getChangeModified(currentChange, previousPosition),
});
const processNewCommands = (inputs, newInitialPosition) => {
    const result = inputs.reduce(reduceNewCommands, newInitialPosition);
    return result.depth * result.horizontal;
};
console.log(processNewCommands(processInput(exampleInput), newInitialPosition));
console.log(processNewCommands(processInput(readInputFromPath('./input.txt')), newInitialPosition));
