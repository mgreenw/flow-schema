// @flow

import { Flow } from '../..';

describe('Void Schema', () => {
  it('should accept anything as input and should fail if the value is not undefined', () => {
    expect(Flow.void.validate(undefined)).toBe(undefined);

    expect(() => Flow.void.validate('String')).toThrow(Flow.ValidationError);
    expect(() => Flow.void.validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.void.validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.void.validate(new Date())).toThrow(Flow.ValidationError);
    expect(() => Flow.void.validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.void.validate({})).toThrow(Flow.ValidationError);
    expect(() => Flow.void.validate({ with: 'props' })).toThrow(Flow.ValidationError);

    const result = Flow.void.validate(undefined);
    (result: void);
    // $ExpectError
    (result: number);
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
