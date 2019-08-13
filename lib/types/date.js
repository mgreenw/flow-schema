// @flow

import { ConvertableSchema } from '../Schema';
import { ValidationError } from '../ValidationError';
import { string } from './string';
import { number } from './number';
import { union } from '../constructors/union';

const StringOrNumberSchema = union(string, number);

function validateDate(value: mixed): Date {
  if (value instanceof Date && Object.prototype.toString.call(value) === '[object Date]') {
    return value;
  }

  throw new ValidationError();
}

function convertDate(value: mixed): Date {
  // If the covert option is true, try to convert from a string or number
  // to a date. If this fails, through the validation error anyways
  const valueDate = new Date(StringOrNumberSchema.validate(value));
  if (!Number.isNaN(valueDate.getTime())) return valueDate;
  throw new ValidationError();
}

class DateSchema extends ConvertableSchema<Date> {
  constructor() {
    super('Date', validateDate, convertDate);
  }

  get iso() {
    return this._withConstraint({
      name: 'iso string',
      validate: (date, value) => {
        // First, the original value MUST be a string.
        // Then, the date's iso string must match the input string
        return string.validate(value) === date.toISOString();
      },
    });
  }
}

const date = new DateSchema();
export { date as Date };
