export function coordinatesToIndex(
  line: number,
  col: number,
  size: number,
): number {
  return size * (size - line - 1) + col + 1;
}
export function indexToCoordinates(
  index: number,
  size: number,
): [line: number, col: number] {
  return [size - Math.trunc((index - 1) / size) - 1, (index - 1) % size];
}
