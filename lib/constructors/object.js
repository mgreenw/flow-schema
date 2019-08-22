/* eslint-disable no-redeclare */
// @flow

import { Schema, type SchemaType } from '../Schema';
import { ValidationError } from '../ValidationError';

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

type AnyObject = { [key: string]: any };
type MixedObject = { +[string]: mixed };

function ensureObject(obj: mixed): MixedObject {
  if (obj && typeof obj === 'object' && !(obj instanceof Array)) return obj;
  throw new ValidationError();
}

function validateMapObject<MapValue>(
  obj: MixedObject,
  mapSchema: Schema<MapValue>
): { [string]: MapValue } {
  // Construct the new object, validating the type of each key
  return Object.keys(obj).reduce((acc, key: string) => {
    return Object.assign(acc, { [key]: mapSchema.validate(obj[key], { propertyName: key }) });
  }, {});
}

function validateExactObject<Obj: AnyObject>(
  obj: MixedObject,
  propertySchemas: Obj
): ValidatedObject<Obj> {
  // Construct the new object, validating the type of each key
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: propertySchemas[key].validate(obj[key], { propertyName: key }),
    });
  }, {});
}

function map<MapValue>(mapSchema: Schema<MapValue>): Schema<{ [string]: MapValue }> {
  return new Schema({
    name: `{ [string]: ${mapSchema.name} }`,
    validate: value => validateMapObject(ensureObject(value), mapSchema),
  });
}

function partialMap<MapValue, Obj: AnyObject>(
  mapSchema: Schema<MapValue>,
  propertySchemas: Schema<Obj>
): Schema<Obj & { [string]: MapValue }> {
  // return intersection(propertySchemas, map(mapSchema));
  const name = `${propertySchemas.name} & ${mapSchema.name}`;
  return new Schema({
    name,
    validate: value => {
      // 1. Validate the exact object.
      // 2. Ensure all OTHER keys are in the map
      const obj = ensureObject(value);
      const exactObject = validateExactObject(obj, propertySchemas);
      const exactObjectKeys = Object.keys(exactObject);
      const mapObject = Object.keys(obj).filter(key => !Object.t)

      // Get all the keys that are not in 'validatedProperties' and ensure they are of type MapValue
      const validatedMap = mapSchema.validate(
        Object.keys(obj).reduce((returnObj, key) => {
          if (key in validatedProperties) return returnObj;
          returnObj[key] = obj[key];
          return returnObj;
        }, {})
      );

      return { ...validatedProperties, ...validatedMap };
    },
  });
}

function partialMapInferred<MapValue, Obj: AnyObject>(
  mapSchema: Schema<MapValue>,
  propertySchemas: Obj
): Schema<ValidatedObject<Obj> & { [string]: MapValue }> {
  const name = `${propertySchemas.name} & ${mapSchema.name}`;
  return new Schema({
    name,
    validate: value => {
      const obj = ensureObject(value);
      const checkedObject = exact(propertySchemas).validate(obj);
      // Get all the keys that are not in 'checkedObject' and ensure they are of type MapValue
      const checkedMap = mapSchema.validate(
        Object.keys(obj).reduce((returnObj, key) => {
          if (key in checkedObject) return returnObj;
          returnObj[key] = obj[key];
          return returnObj;
        }, {})
      );

      return { ...checkedObject, ...checkedMap };
    },
  });
}

function exact<Obj: AnyObject>(propertySchemas: Obj): Schema<ValidatedObject<Obj>> {
  return new Schema({
    name: generateName(propertySchemas),
    validate: value => validateExactObject(ensureObject(value), propertySchemas),
  });
}

type ValidatedObject<Schemas: { [key: string]: any }> = $ObjMap<Schemas, SchemaType>;

declare function object<MapValue>(mapSchema: Schema<MapValue>): Schema<{ [string]: MapValue }>;
declare function object<Obj: AnyObject>(propertySchemas: Obj): Schema<ValidatedObject<Obj>>;
declare function object<MapValue, Obj: AnyObject>(
  mapSchema: Schema<MapValue>,
  propertySchemas: Schema<Obj>
): Schema<Obj & { [string]: MapValue }>;
declare function object<MapValue, Obj: AnyObject>(
  mapSchema: Schema<MapValue>,
  propertySchemas: Obj
): Schema<ValidatedObject<Obj> & { [string]: MapValue }>;
export function object<MapValue, Obj: AnyObject>(
  mapOrPropertiesSchema: Schema<MapValue> | Obj,
  propertySchemas?: Obj | Schema<Obj>
): Schema<ValidatedObject<Obj> & { [string]: MapValue }> {
  if (mapOrPropertiesSchema instanceof Schema) {
    if (!propertySchemas) return map(mapOrPropertiesSchema);
    if (propertySchemas instanceof Schema) {
      return partialMap(mapOrPropertiesSchema, propertySchemas);
    }

    return partialMapInferred(mapOrPropertiesSchema, propertySchemas);
  } else {
    return exact(mapOrPropertiesSchema);
  }
}
