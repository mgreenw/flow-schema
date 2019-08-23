// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export const boolean: Schema<boolean> = new Schema({
  name: 'boolean',
  validate: value => {
    if (typeof value === 'boolean') return value;
    throw new ValidationError();
  },
});
