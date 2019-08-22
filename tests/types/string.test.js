// @flow

import { Flow } from '../..';

describe('String Schema', () => {
  it('should accept anything as input and should fail if the value is not a string', () => {
    expect(Flow.string.validate('String')).toBe('String');
    expect(Flow.string.validate('1234')).toBe('1234');
    expect(Flow.string.validate('')).toBe('');

    expect(() => Flow.string.validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.string.validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.string.validate(new Date())).toThrow(Flow.ValidationError);
    expect(() => Flow.string.validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.string.validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.string.validate({})).toThrow(Flow.ValidationError);
    expect(() => Flow.string.validate({ with: 'props' })).toThrow(Flow.ValidationError);

    const result = Flow.string.validate('ha');
    (result: string);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: {});
  });
});
