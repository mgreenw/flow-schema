// @flow

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';
import { string } from './string';
import { number } from './number';
import { union } from '../constructors/union';

const StringOrNumberSchema = union(string, number);

class DateSchema extends Schema<Date> {
  constructor() {
    super({
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
  }

  min(minDate: Date) {
    return this.constrain({
      description: `min ${minDate.toString()}`,
      constrain: date => (date > minDate ? date : undefined),
    });
  }
}

const date = new DateSchema();
export { date as Date };
