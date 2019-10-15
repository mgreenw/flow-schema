// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export function literal<T: boolean | number | string>(expectedValue: T): Schema<T> {
  return new Schema({
    name: expectedValue.toString(),
    validate: value => {
      if (value === expectedValue) return expectedValue;
      throw new ValidationError();
    },
  });
}
