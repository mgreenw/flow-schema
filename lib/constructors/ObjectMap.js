// @flow

import { Schema } from '../Schema';
import { ensureObject } from '../utils/object';

export function ObjectMap<Value>(valueSchema: Schema<Value>): Schema<{ [string]: Value }> {
  return new Schema({
    name: `{ [string]: ${valueSchema.name} }`,
    validate: value => {
      const obj = ensureObject(value);
      return Object.keys(obj).reduce((acc, key: string) => {
        return Object.assign(acc, { [key]: valueSchema.validate(obj[key], { propertyName: key }) });
      }, {});
    },
  });
}
