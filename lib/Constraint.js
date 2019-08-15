// @flow

export type Constraint<T> = {
  description: string,
  validate: (T, mixed) => boolean,
};
