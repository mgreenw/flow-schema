// @flow

import { Schema } from '../Schema';
import { validateObjectMap } from '../utils/object';

export function ObjectMap<Value>(valueSchema: Schema<Value>): Schema<{ [string]: Value }> {
  return new Schema({
    name: `{ [string]: ${valueSchema.name} }`,
    validate: value => validateObjectMap(value, valueSchema),
  });
}
