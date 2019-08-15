// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';
import { string } from './string';
import { number } from './number';
import { union } from '../constructors/union';

const StringOrNumberSchema = union(string, number);

const date: Schema<Date> = new Schema({
  name: 'Date',
  validate: value => {
    if (value instanceof Date && Object.prototype.toString.call(value) === '[object Date]') {
      return value;
    }

    throw new ValidationError();
  },
  convert: value => {
    // If the covert option is true, try to convert from a string or number
    // to a date. If this fails, through the validation error anyways
    const valueDate = new Date(StringOrNumberSchema.validate(value));
    if (!Number.isNaN(valueDate.getTime())) return valueDate;
    throw new ValidationError();
  },
});
export { date as Date };
