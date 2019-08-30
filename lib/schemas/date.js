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

  min(min: Date) {
    return this.constrain({
      description: `>= ${min.toString()}`,
      constrain: date => (date >= min ? date : undefined),
    });
  }

  greater(min: Date) {
    return this.constrain({
      description: `> ${min.toString()}`,
      constrain: date => (date > min ? date : undefined),
    });
  }

  less(max: Date) {
    return this.constrain({
      description: `< ${max.toString()}`,
      constrain: date => (date < max ? date : undefined),
    });
  }

  max(max: Date) {
    return this.constrain({
      description: `<= ${max.toString()}`,
      constrain: date => (date <= max ? date : undefined),
    });
  }

  get iso() {
    return this.constrain({
      description: `iso`,
      constrain: (date, value) => {
        if (date.toISOString() === value) return date;
      },
    });
  }

  timestamp(type: 'javascript' | 'unix' = 'javascript') {
    if (!['javascript', 'unix'].includes(type)) {
      throw new Error('"Type" must be one of ["javascript", "unix"]');
    }

    return this.constrain({
      description: `${type} timestamp`,
      constrain: (date, value) => {
        if (type === 'javascript' && date.getTime() === value) return date;
        if (typeof value !== 'number') return;
        if (type === 'unix' && date.getTime() === value * 1000) return date;
      },
    });
  }
}

const date = new DateSchema();
export { date as Date };
