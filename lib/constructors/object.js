/* eslint-disable no-redeclare */
// @flow

import { Schema, type SchemaType } from '../Schema';
import { validateExactObject, type AnyObject } from '../utils/object';

/*
  Object names are challenging because we can't just stringify the object as
  JSON and then print it because JSON contains lots of unnessary quotes.
  Additionally, we want the object to be on one line if it is small enough,
  but we also want to pretty print it on multiple lines if it is too big. We
  use a custom name generation function in order to handle these two cases.
*/

function indent(str) {
  return str.replace(/\n/g, '\n  ');
}

function generateNameWithIndent<S: { [key: string]: Schema<any> }>(
  schemas: S,
  readonly: boolean
): string {
  const elements = Object.keys(schemas).map(key => {
    return `  ${readonly ? '+' : ''}${key}: ${indent(schemas[key].name)}`;
  });
  return `{\n${elements.join(',\n')}\n}`;
}

function generateNameNoIndent<S: { [key: string]: Schema<any> }>(
  schemas: S,
  readonly: boolean
): string {
  const elements = Object.keys(schemas).map(key => {
    return `${readonly ? '+' : ''}${key}: ${schemas[key].name}`;
  });
  return `{ ${elements.join(', ')} }`;
}

function generateName<S: { [key: string]: Schema<any> }>(
  schemas: S,
  readonly: boolean = false
): string {
  const keys = Object.keys(schemas);
  if (keys.length === 0) return '{}';
  if (keys.length > 3) return generateNameWithIndent(schemas, readonly);

  // The addition of 2 is two spaces and a comma
  const length = keys
    .map(key => key.length + schemas[key].name.length + 3)
    .reduce((sum, a) => sum + a);

  // If length is greater than 40, indent, otherwise don't indent.
  return length > 40
    ? generateNameWithIndent(schemas, readonly)
    : generateNameNoIndent(schemas, readonly);
}

function object<Obj: AnyObject>(propertySchemas: Obj): Schema<$ObjMap<Obj, SchemaType>> {
  return new Schema({
    name: generateName(propertySchemas),
    validate: value => validateExactObject(value, propertySchemas),
  });
}

export { object as Object };
