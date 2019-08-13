// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export function $Keys<T: { [string]: any }>(obj: T): Schema<$Keys<T>> {
  const objKeys = Object.keys(obj);

  return new Schema(`${objKeys.join(' | ')}`, value => {
    // Ensure the value is a string
    if (typeof value !== 'string' || !objKeys.includes(value)) {
      throw new ValidationError();
    }

    return value;
  });
}
