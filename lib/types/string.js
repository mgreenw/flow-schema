// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

class StringSchema extends Schema<string> {
  constructor() {
    super('string', value => {
      if (typeof value === 'string') return value;
      throw new ValidationError();
    });
  }

  min(min: number) {
    return this._withConstraint({
      name: `length >= ${min}`,
      validate: str => str.length >= min,
    });
  }

  max(max: number) {
    return this._withConstraint({
      name: `length <= ${max}`,
      validate: str => str.length <= max,
    });
  }
}

export const string = new StringSchema();
