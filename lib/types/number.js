// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

class NumberSchema extends Schema<number> {
  constructor() {
    super('number', value => {
      if (typeof value === 'number') return value;
      throw new ValidationError();
    });
  }

  get integer() {
    return this._withConstraint({
      description: 'integer',
      validate: number => Number.isInteger(number),
    });
  }

  min(min: number) {
    return this._withConstraint({
      description: `>= ${min}`,
      validate: number => number >= min,
    });
  }

  max(max: number) {
    return this._withConstraint({
      description: `<= ${max}`,
      validate: number => number <= max,
    });
  }

  get natural() {
    return this._withConstraint({
      description: 'natural',
      validate: number => Number.isInteger(number) && number > 0,
    });
  }
}

export const number = new NumberSchema();
