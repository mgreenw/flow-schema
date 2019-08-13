// @flow

import { Context } from './Context';
import { ValidationError } from './ValidationError';

type Constraint<T> = {
  name: string,
  validate: (T, mixed) => boolean,
};

type Options = {
  propertyName?: string,
};

export class Schema<T> {
  _name: string;
  _validate: mixed => T;
  _constraints: Constraint<T>[];
  _conversions: Array<(mixed) => T>;

  constructor(name: string, validate: mixed => T) {
    this._name = name;
    this._validate = validate;
    this._constraints = [];
    this._conversions = [];
  }

  get name(): string {
    let constraints = '';
    if (this._constraints.length !== 0) {
      constraints = ` /* ${this._constraints.map(constraint => constraint.name).join(', ')} */`;
    }

    return `${this._name}${constraints}`;
  }

  get optional(): Schema<T | void> {
    return new Schema(`${this.name} | void`, value => {
      if (value === undefined) return undefined;
      return this._validateTypeAndConstraints(value);
    });
  }

  get nullable(): Schema<T | null> {
    return new Schema(`${this.name} | null`, value => {
      if (value === null) return null;
      return this._validateTypeAndConstraints(value);
    });
  }

  get maybe(): Schema<T | null | void> {
    return new Schema(`${this.name} | null | void`, value => {
      if (value === undefined || value === null) return value;
      return this._validateTypeAndConstraints(value);
    });
  }

  validate(value: mixed, options: Options = {}): T {
    try {
      // Validate and return the value.
      return this._validateOrConvert(value);
    } catch (error) {
      // Add Context to the thrown ValidationError
      if (error instanceof ValidationError) {
        error.addContext(new Context(this, value, options.propertyName));
      }

      throw error;
    }
  }

  _validateOrConvert(value: mixed): T {
    try {
      // First, try to just validate the raw value
      return this._validateTypeAndConstraints(value);
    } catch (error) {
      // Ensure that there are conversion available and that the error is a ValidationError
      if (this._conversions.length === 0 || !(error instanceof ValidationError)) throw error;

      // If initial validation fails, convert the value and re-attemtp validation
      const convertedValue = this._conversions.reduce(
        (convertingValue, convert) => convert(convertingValue),
        value
      );
      return this._validateTypeAndConstraints(convertedValue);
    }
  }

  _validateTypeAndConstraints(value: mixed): T {
    // Perform the validation! This is the important validation using the _validate property.=
    const typedValue = this._validate(value);

    // Test all the constraints to see if any fail
    const failedConstraints = this._constraints.reduce((failedConstraints, constraint) => {
      if (!constraint.validate(typedValue, value)) failedConstraints.push(constraint.name);
      return failedConstraints;
    }, ([]: string[]));

    // If any constraints fail, throw a ValidationError.
    if (failedConstraints.length > 0) throw new ValidationError(failedConstraints);
    return typedValue;
  }

  _clone(): this {
    // $ExpectError Flow does not understand how Object.getPrototypeOf() works.
    const clonedSchema = Object.create(Object.getPrototypeOf(this));
    clonedSchema._name = this._name;
    clonedSchema._validate = this._validate;

    // The elements of the array can be references, but the array itself
    // must be copied so that additions to the cloned array do no affect the
    // original array. This syntax provides a simple method to copy an array.
    clonedSchema._constraints = [...this._constraints];
    clonedSchema._conversions = [...this._conversions];
    return clonedSchema;
  }

  _withConstraint(constraint: Constraint<T>): this {
    const clone = this._clone();
    clone._constraints.push(constraint);
    return clone;
  }

  _withConversion(conversion: mixed => T) {
    this._conversions.push(conversion);
  }
}

export class ConvertableSchema<T> extends Schema<T> {
  _convert: mixed => T;

  constructor(name: string, validate: mixed => T, convert: mixed => T) {
    super(name, validate);
    this._convert = convert;
  }

  get convert(): this {
    const clone = this._clone();
    clone._withConversion(this._convert);
    return clone;
  }
}

export type ExtractSchemaType = <T>(schema: Schema<T>) => T;
export type Validated<Schema> = $Call<ExtractSchemaType, Schema>;
