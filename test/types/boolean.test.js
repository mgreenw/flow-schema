// @flow

import { Flow } from '../..';

describe('Boolean Schema', () => {
  it('should accept anything as input and should fail if the value is not a boolean', () => {
    expect(Flow.boolean.validate(true)).toBe(true);
    expect(Flow.boolean.validate(false)).toBe(false);

    expect(() => Flow.boolean.validate('String')).toThrow(Flow.ValidationError);
    expect(() => Flow.boolean.validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.boolean.validate(new Date())).toThrow(Flow.ValidationError);
    expect(() => Flow.boolean.validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.boolean.validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.boolean.validate({})).toThrow(Flow.ValidationError);
    expect(() => Flow.boolean.validate({ with: 'props' })).toThrow(Flow.ValidationError);

    const result = Flow.boolean.validate(true);
    (result: boolean);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: {});
  });
});
