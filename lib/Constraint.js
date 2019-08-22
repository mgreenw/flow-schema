// @flow

export type Constraint<T> = {
  description: string,

  // An undefined return indicates a constraint failure
  constrain: (validatedValue: T, inputValue: mixed) => T | void,
};
