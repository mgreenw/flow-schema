// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export const isNull: Schema<null> = new Schema('null', value => {
  if (value === null) return null;
  throw new ValidationError();
});

// Alias isNull to 'null'
export { isNull as null };
