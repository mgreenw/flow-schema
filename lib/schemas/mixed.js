// @flow

import { Schema } from '../Schema';

export const mixed: Schema<mixed> = new Schema({
  name: 'mixed',
  validate: value => value,
});
