// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

const isNull: Schema<null> = new Schema({
  name: 'null',
  validate: value => {
    if (value === null) return null;
    throw new ValidationError();
  },
});

// Alias isNull to 'null'
export { isNull as null };
