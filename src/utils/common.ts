const getFirstLetter = (str: string): string => str.slice(0, 1);

const getNewArrayFilledWithSequence = (start: number, end: number): number[] =>
  new Array(end - start + 1).fill(0).map((_, i) => i);

export { getFirstLetter, getNewArrayFilledWithSequence };
