// @flow

import { ValidationError } from '../ValidationError';

export type AnyObject = { [key: string]: any };
export type MixedObject = { +[string]: mixed };

export function ensureObject(value: mixed): MixedObject {
  // Ensure the value is an object
  if (!value || typeof value !== 'object' || value instanceof Array || value instanceof Date) {
    throw new ValidationError();
  }

  return value;
}
