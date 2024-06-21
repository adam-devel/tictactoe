export function black(text: string) {
  return "\x1B[30m" + text + "\u001B[0m";
}
export function red(text: string) {
  return "\x1B[31m" + text + "\u001B[0m";
}
export function green(text: string) {
  return "\x1B[32m" + text + "\u001B[0m";
}
export function yellow(text: string) {
  return "\x1B[33m" + text + "\u001B[0m";
}
export function blue(text: string) {
  return "\x1B[34m" + text + "\u001B[0m";
}
export function magenta(text: string) {
  return "\x1B[35m" + text + "\u001B[0m";
}
export function cyan(text: string) {
  return "\x1B[36m" + text + "\u001B[0m";
}
export function white(text: string) {
  return "\x1B[37m" + text + "\u001B[0m";
}
export function gray(text: string) {
  return "\x1B[38m" + text + "\u001B[0m";
}
export function bold(text: string) {
  return "\x1B[1m" + text + "\u001B[0m";
}
export function dim(text: string) {
  return "\x1B[2m" + text + "\u001B[0m";
}
export function italic(text: string) {
  return "\x1B[3m" + text + "\u001B[0m";
}
export function underline(text: string) {
  return "\x1B[4m" + text + "\u001B[0m";
}
export function invert(text: string) {
  return "\x1B[7m" + text + "\u001B[0m";
}
export function erase() {
  return "\x1B[2J\x1B[H";
}
