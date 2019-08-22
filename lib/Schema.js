// @flow

import { Context } from './Context';
import { ValidationError } from './ValidationError';
import { type Constraint } from './Constraint';

type Options<T> = {
  name: string,
  validate: mixed => T,
  convert?: mixed => T,
};

type ValidateOptions = {
  propertyName?: string,
};

export class Schema<T> {
  _name: string;
  _validate: mixed => T;
  _constraints: Constraint<T>[];
  _convert: void | (mixed => T);
  shouldConvert: boolean;

  constructor(options: Options<T>) {
    this._name = options.name;
    this._validate = options.validate;
    this._convert = options.convert;
    this._constraints = [];
    this.shouldConvert = false;
  }

  get name(): string {
    let constraints = '';
    if (this._constraints.length !== 0) {
      constraints = ` /* ${this._constraints
        .map(constraint => constraint.description)
        .join(', ')} */`;
    }

    return `${this._name}${constraints}`;
  }

  get optional(): Schema<T | void> {
    return new Schema({
      name: `${this.name} | void`,
      validate: value => {
        if (value === undefined) return undefined;
        return this._validateTypeAndConstraints(value);
      },
    });
  }

  get nullable(): Schema<T | null> {
    return new Schema({
      name: `${this.name} | null`,
      validate: value => {
        if (value === null) return null;
        return this._validateTypeAndConstraints(value);
      },
    });
  }

  get maybe(): Schema<T | null | void> {
    return new Schema({
      name: `${this.name} | null | void`,
      validate: value => {
        if (value === undefined || value === null) return value;
        return this._validateTypeAndConstraints(value);
      },
    });
  }

  get nonMaybe(): Schema<$NonMaybeType<T>> {
    return new Schema({
      name: `$NonMaybeType<${this.name}>`,
      validate: value => {
        if (value === undefined || value === null) throw new ValidationError();
        return this._validateTypeAndConstraints(value);
      },
    });
  }

  validate(value: mixed, options: ValidateOptions = {}): T {
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

  constrain(...constraints: Constraint<T>[]): this {
    const clone = this._clone();
    clone._constraints.push(...constraints);
    return clone;
  }

  get convert(): Schema<T> {
    if (this._convert === undefined) return this;

    const clone = this._clone();
    clone.shouldConvert = true;
    return clone;
  }

  _validateOrConvert(value: mixed): T {
    try {
      return this._validateTypeAndConstraints(value);
    } catch (error) {
      if (!(error instanceof ValidationError)) throw error;
      if (!this.shouldConvert || this._convert === undefined) throw error;
      return this._validateTypeAndConstraints(this._convert(value));
    }
  }

  _validateTypeAndConstraints(value: mixed): T {
    // Perform the validation! This is the important validation using the _validate property.=
    let typedValue = this._validate(value);

    // Test all the constraints to see if any fail
    const failedConstraints = this._constraints.reduce((failedConstraints, constraint) => {
      const constrainedValue = constraint.constrain(typedValue, value);

      // Either add the failed constraint or update the typed value
      if (constrainedValue === undefined) failedConstraints.push(constraint);
      else typedValue = constrainedValue;

      return failedConstraints;
    }, ([]: Constraint<any>[]));

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
    clonedSchema._convert = this._convert;
    return clonedSchema;
  }
}

export type SchemaType = <T>(schema: Schema<T>) => T;
export type Validated<Schema> = $Call<SchemaType, Schema>;
