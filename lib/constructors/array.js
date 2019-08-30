// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

class ArraySchema<T> extends Schema<T[]> {
  constructor(schema: Schema<T>) {
    super({
      name: `Array<${schema.name}>`,
      validate: value => {
        // Ensure the value is an array
        if (!Array.isArray(value)) {
          throw new ValidationError();
        }

        // Validate every element of the array
        return value.map(elem => schema.validate(elem));
      },
    });
  }

  min(length: number) {
    return this.constrain({
      description: `length > ${length}`,
      constrain: array => (array.length > length ? array : undefined),
    });
  }

  max(length: number) {
    return this.constrain({
      description: `length < ${length}`,
      constrain: array => (array.length < length ? array : undefined),
    });
  }

  length(length: number) {
    return this.constrain({
      description: `length === ${length}`,
      constrain: array => (array.length === length ? array : undefined),
    });
  }

  unique(comparator?: (a: T, b: T) => boolean) {
    return this.constrain({
      description: `unique`,
      constrain: array => {
        // If a comparator is set, ensure each element is unique by it
        if (comparator) {
          for (let indexA = 0; indexA < array.length; indexA++) {
            for (let indexB = indexA + 1; indexB < array.length; indexB++) {
              if (!comparator(array[indexA], array[indexB])) return undefined;
            }
          }
          return array;
        }

        // If there is no comparator, use a set to determine that all elementsa are unique
        if (new Set(array).size === array.length) return array;
      },
    });
  }

  has<V: T>(schema: Schema<V>) {
    return this.constrain({
      description: `has ${schema.name}`,
      constrain: array => {
        const arrayHasValue = array.find(value => {
          try {
            schema.validate(value);
            return true;
          } catch (error) {
            return false;
          }
        });
        if (arrayHasValue) return array;
      },
    });
  }
}

function array<T>(schema: Schema<T>): ArraySchema<T> {
  return new ArraySchema(schema);
}

export { array as Array };
