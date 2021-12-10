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

type Command = 'forward' | 'down' | 'up';

type Position = {
  horizontal: number;
  depth: number;
};

const initialPosition: Position = {
  horizontal: 0,
  depth: 0,
};

const getChange = ([command, offset]: [Command, number], position: Position): Partial<Position> => {
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

const reduceCommand = (previousPosition: Position, currentChange: [Command, number]) => ({
  ...previousPosition,
  ...getChange(currentChange, previousPosition),
});

const processCommand = (inputs: Array<[Command, number]>, initialPosition: Position): number => {
  const result = inputs.reduce(reduceCommand, initialPosition);
  return result.depth * result.horizontal;
};

const processInput = (input: string) =>
  input
    .split('\n')
    .map(s => s.split(' '))
    .map(el => [el[0], parseInt(el[1], 10)] as [Command, number]);

console.log(processCommand(processInput(exampleInput), initialPosition));
console.log(processCommand(processInput(readInputFromPath('./input.txt')), initialPosition));

/**
 * Part 2
 */

interface ExtendedPosition extends Position {
  aim: number;
}

const newInitialPosition: ExtendedPosition = {
  horizontal: 0,
  depth: 0,
  aim: 0,
};

const getChangeModified = (
  [command, offset]: [Command, number],
  position: ExtendedPosition,
): Partial<ExtendedPosition> => {
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

const reduceNewCommands = (previousPosition: ExtendedPosition, currentChange: [Command, number]) => ({
  ...previousPosition,
  ...getChangeModified(currentChange, previousPosition),
});

const processNewCommands = (inputs: Array<[Command, number]>, newInitialPosition: ExtendedPosition): number => {
  const result = inputs.reduce(reduceNewCommands, newInitialPosition);
  return result.depth * result.horizontal;
};

console.log(processNewCommands(processInput(exampleInput), newInitialPosition));
console.log(processNewCommands(processInput(readInputFromPath('./input.txt')), newInitialPosition));
