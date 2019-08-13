// @flow

import { Schema } from './schema';

/*
Because validations can be nested, a context represents a specific nested
validation that is part of a larger validation. These contexts are stored in
an array like a stack and are pushed on as the errors are caught. This allows
us to see the full picture of the contexts in which the error occurred and to
print a verbose and descriptive error message.
*/
export class Context<T> {
  schema: Schema<T>;
  value: mixed;
  propertyName: string | null;

  constructor(schema: Schema<T>, value: mixed, propertyName: string | null = null) {
    this.schema = schema;
    this.value = value;
    this.propertyName = propertyName;
  }

  get valueString(): string {
    if (this.value === undefined) return 'undefined';
    return JSON.stringify(this.value, null, 2) || '<unknown value>';
  }

  get valueConstructor(): string | null {
    if (
      this.value &&
      this.value.constructor &&
      this.value.constructor.name &&
      typeof this.value.constructor.name === 'string'
    ) {
      return this.value.constructor.name;
    }
    return null;
  }

  get expectedType(): string {
    return this.schema.name;
  }
}
