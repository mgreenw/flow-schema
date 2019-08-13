// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export const undef: Schema<void> = new Schema('void', value => {
  if (value === undefined) return undefined;
  throw new ValidationError();
});
// Alias undef to 'undefined' and 'void'
export { undef as void };
