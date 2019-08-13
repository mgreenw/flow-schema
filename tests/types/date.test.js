// @flow

import { Flow } from '../..';

describe('Date Type', () => {
  it('should accept anything as input and should fail if the value is not a Date', () => {
    const date = new Date();
    expect(Flow.Date.validate(date)).toBe(date);

    expect(() => Flow.Date.validate('String')).toThrow(Flow.ValidationError);
    expect(() => Flow.Date.validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.Date.validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.Date.validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.Date.validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.Date.validate({})).toThrow(Flow.ValidationError);
    expect(() => Flow.Date.validate({ with: 'props' })).toThrow(Flow.ValidationError);

    const result = Flow.Date.validate(new Date());
    (result: Date);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: {||});
  });
});
