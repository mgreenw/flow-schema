// @flow

import { Flow } from '../..';

describe('Any Schema', () => {
  it('should accept anything as input and should never fail', () => {
    expect(Flow.any.validate('String')).toBe('String');
    expect(Flow.any.validate(123)).toBe(123);
    expect(Flow.any.validate(true)).toBe(true);

    const date = new Date();
    expect(Flow.any.validate(date)).toBe(date);

    const emptyObj = {};
    expect(Flow.any.validate(emptyObj)).toBe(emptyObj);

    const obj = { with: 'properties', that: 'are', very: 117 };
    expect(Flow.any.validate(obj)).toBe(obj);

    (Flow.any.validate('hehe'): any);
  });
});
