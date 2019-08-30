// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

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

  min(min: number) {
    return this.constrain({
      description: `length >= ${min.toString()}`,
      constrain: string => (string.length >= min ? string : undefined),
    });
  }

  max(max: number) {
    return this.constrain({
      description: `<= ${max.toString()}`,
      constrain: string => (string.length <= max ? string : undefined),
    });
  }

  length(length: number) {
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
