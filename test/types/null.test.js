// @flow

import { Flow } from '../..';

describe('Null Schema', () => {
  it('should accept anything as input and should fail if the value is not null', () => {
    expect(Flow.null.validate(null)).toBe(null);

    expect(() => Flow.null.validate('String')).toThrow(Flow.ValidationError);
    expect(() => Flow.null.validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.null.validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.null.validate(new Date())).toThrow(Flow.ValidationError);
    expect(() => Flow.null.validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.null.validate({})).toThrow(Flow.ValidationError);
    expect(() => Flow.null.validate({ with: 'props' })).toThrow(Flow.ValidationError);

    const result = Flow.null.validate(null);
    (result: null);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: {});
  });
});
