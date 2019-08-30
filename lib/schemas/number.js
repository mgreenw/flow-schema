// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

class NumberSchema extends Schema<number> {
  constructor() {
    super({
      name: 'number',
      validate: value => {
        if (typeof value === 'number') return value;
        throw new ValidationError();
      },
    });
  }

  min(min: number) {
    return this.constrain({
      description: `>= ${min.toString()}`,
      constrain: number => (number >= min ? number : undefined),
    });
  }

  greater(min: number) {
    return this.constrain({
      description: `> ${min.toString()}`,
      constrain: number => (number > min ? number : undefined),
    });
  }

  less(max: number) {
    return this.constrain({
      description: `< ${max.toString()}`,
      constrain: number => (number < max ? number : undefined),
    });
  }

  max(max: number) {
    return this.constrain({
      description: `<= ${max.toString()}`,
      constrain: number => (number <= max ? number : undefined),
    });
  }

  get integer() {
    return this.constrain({
      description: 'integer',
      constrain: number => (Number.isInteger(number) ? number : undefined),
    });
  }
}

export const number = new NumberSchema();
