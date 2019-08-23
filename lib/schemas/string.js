// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export const string: Schema<string> = new Schema({
  name: 'string',
  validate: value => {
    if (typeof value === 'string') return value;
    throw new ValidationError();
  },
});
