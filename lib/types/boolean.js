// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export const boolean: Schema<boolean> = new Schema('boolean', value => {
  if (typeof value === 'boolean') return value;
  throw new ValidationError();
});
