// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export const number: Schema<number> = new Schema({
  name: 'number',
  validate: value => {
    if (typeof value === 'number') return value;
    throw new ValidationError();
  },
});
