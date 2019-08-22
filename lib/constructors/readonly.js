/* eslint-disable no-redeclare */
// @flow

import { Schema } from '../Schema';

declare function $ReadOnly<T: any[]>(schema: Schema<T>): Schema<$ReadOnlyArray<T>>;
declare function $ReadOnly<T: { [key: string]: any }>(schema: Schema<T>): Schema<$ReadOnly<T>>;
export function $ReadOnly<T>(schema: Schema<T>) {
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
