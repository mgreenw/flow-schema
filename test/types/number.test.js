// @flow

import { Flow } from '../..';

describe('Number Schema', () => {
  it('should accept anything as input and should fail if the value is not a number', () => {
    expect(Flow.number.validate(123)).toBe(123);
    expect(Flow.number.validate(0)).toBe(0);
    expect(Flow.number.validate(Number.NaN)).toBe(Number.NaN);

    expect(() => Flow.number.validate('String')).toThrow(Flow.ValidationError);
    expect(() => Flow.number.validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.number.validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.number.validate(new Date())).toThrow(Flow.ValidationError);
    expect(() => Flow.number.validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.number.validate({})).toThrow(Flow.ValidationError);
    expect(() => Flow.number.validate({ with: 'props' })).toThrow(Flow.ValidationError);

    const result = Flow.number.validate(11100011);
    (result: number);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: {});
  });
});
