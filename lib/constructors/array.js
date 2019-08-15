// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

function array<T>(schema: Schema<T>): Schema<Array<T>> {
  return new Schema({
    name: `Array<${schema.name}>`,
    validate: value => {
      // Ensure the value is an array
      if (!Array.isArray(value)) {
        throw new ValidationError();
      }

      // Validate every element of the array
      return value.map(elem => schema.validate(elem));
    },
  });
}
export { array as Array };
