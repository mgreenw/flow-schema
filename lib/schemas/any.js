// @flow

import { Schema } from '../Schema';

export const any: Schema<any> = new Schema({
  name: 'any',
  validate: value => value,
});
