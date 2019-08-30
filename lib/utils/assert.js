// @flow

export function assert(assertion: boolean, errorMessage: string) {
  if (!assertion) throw new Error(errorMessage);
}
