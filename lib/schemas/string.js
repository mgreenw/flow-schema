// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';
import { assert } from '../utils/assert';

class StringSchema extends Schema<string> {
  constructor() {
    super({
      name: 'string',
      validate: value => {
        if (typeof value === 'string') return value;
        throw new ValidationError();
      },
    });
  }

  min(length: number) {
    assert(length >= 0, `Minimum string length constraint must be positive (received ${length})`);
    return this.constrain({
      description: `length >= ${length.toString()}`,
      constrain: string => (string.length >= length ? string : undefined),
    });
  }

  max(length: number) {
    assert(length >= 0, `Maximum string length constraint must be positive (received ${length})`);
    return this.constrain({
      description: `<= ${length.toString()}`,
      constrain: string => (string.length <= length ? string : undefined),
    });
  }

  length(length: number) {
    assert(length >= 0, `String length constraint must be positive (received ${length})`);
    return this.constrain({
      description: `length === ${length}`,
      constrain: string => (string.length === length ? string : undefined),
    });
  }

  get uppercase() {
    return this.constrain({
      description: 'uppercase',
      constrain: string => (string.toUpperCase() === string ? string : undefined),
    });
  }

  get lowercase() {
    return this.constrain({
      description: 'lowercase',
      constrain: string => (string.toLowerCase() === string ? string : undefined),
    });
  }
}

export const string = new StringSchema();
