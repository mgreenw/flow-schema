// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

export function partialMap<MapValue: { [string]: any }, ObjValue: Object>(
  ObjectSchema: Schema<ObjValue>,
  MapSchema: Schema<MapValue>
): Schema<ObjValue & MapValue> {
  const name = `${ObjectSchema.name} & ${MapSchema.name}`;
  return new Schema(name, (value: mixed) => {
    if (!value || typeof value !== 'object' || value instanceof Array) {
      throw new ValidationError();
    }
    const incomingObject = value;
    const checkedObject = ObjectSchema.validate(incomingObject);
    // Get all the keys that are not in 'checkedObject' and ensure they are of type MapValue
    const checkedMap = MapSchema.validate(
      Object.keys(incomingObject).reduce((returnObj, key) => {
        if (key in checkedObject) return returnObj;
        returnObj[key] = incomingObject[key];
        return returnObj;
      }, {})
    );

    return { ...checkedObject, ...checkedMap };
  });
}
