// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export function literal<T>(expectedValue: T): Schema<T> {
  return new Schema(JSON.stringify(expectedValue) || '<unknown value>', value => {
    if (value === expectedValue) return expectedValue;
    throw new ValidationError();
  });
}
