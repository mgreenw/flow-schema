// @flow

import { Schema, type SchemaType } from '../Schema';
import { ValidationError } from '../ValidationError';

export type AnyObject = { [key: string]: any };
export type MixedObject = { +[string]: mixed };

export function ensureObject(obj: mixed): MixedObject {
  if (obj && typeof obj === 'object' && !(obj instanceof Array)) return obj;
  throw new ValidationError();
}

export function validateExactObject<Schemas: AnyObject>(
  value: mixed,
  propertySchemas: Schemas
): $ObjMap<Schemas, SchemaType> {
  // Construct the new object, validating the type of each key
  const obj = ensureObject(value);
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: propertySchemas[key].validate(obj[key], { propertyName: key }),
    });
  }, {});
}

export function validateObjectMap<MapValue>(
  value: mixed,
  mapSchema: Schema<MapValue>
): { [string]: MapValue } {
  // Construct the new object, validating the type of each key
  const obj = ensureObject(value);
  return Object.keys(obj).reduce((acc, key: string) => {
    return Object.assign(acc, { [key]: mapSchema.validate(obj[key], { propertyName: key }) });
  }, {});
}
