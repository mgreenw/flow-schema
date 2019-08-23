/* eslint-disable no-redeclare */
// @flow

import { Schema } from '../Schema';

export function $ReadOnly<T: { [key: string]: any }>(schema: Schema<T>): Schema<$ReadOnly<T>> {
  return new Schema({
    name: `$ReadOnly<${schema.name}>`,
    validate: value => Object.freeze(schema.validate(value)),
  });
}

export function $ReadOnlyArray<T: any[]>(schema: Schema<T>): Schema<$ReadOnlyArray<T>> {
  return new Schema({
    name: `$ReadOnlyArray<${schema.name}>`,
    validate: value => Object.freeze(schema.validate(value)),
  });
}
