// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export function ObjectMap<T>(schema: Schema<T>): Schema<{ [string]: T }> {
  return new Schema({
    name: `{ [string]: ${schema.name} }`,
    validate: obj => {
      if (!obj || typeof obj !== 'object' || obj instanceof Array) {
        throw new ValidationError();
      }

      // Ensure each value of the object is of type Value
      let newObj: { [key: string]: T } = {};
      for (let key in obj) {
        newObj[key] = schema.validate(obj[key]);
      }
      return newObj;
    },
  });
}
