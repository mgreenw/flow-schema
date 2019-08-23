/* eslint-disable flowtype/generic-spacing */
// @flow

import { Flow } from '../..';

describe('$ReadOnly Schema', () => {
  // It should not accept non-schema values
  it('should properly extract the keys into a union', () => {
    const objOne = { one: 'one', two: 'two' };
    (Flow.$Keys(objOne).validate('one'): $Keys<typeof objOne>);
    const objTwo = { one: 'one', two: 'two', three: 3 };
    (Flow.$Keys(objTwo).validate('one'): $Keys<typeof objTwo>);
    // $ExpectError
    (Flow.$Keys({ one: 'one', two: 'two', three: 3 }).validate('one'): 'one' | 'two' | 3);
  });

  it('should pass validation if the key exists in the object', () => {
    expect(Flow.$Keys({ one: 'one', two: 'two' }).validate('one')).toBe('one');
    expect(Flow.$Keys({ one: 'one', two: 'two', three: 3 }).validate('three')).toBe('three');
    expect(Flow.$Keys({ one: 'one', two: 'two', three: 3 }).validate('one')).toBe('one');
  });

  it('should fail validation if the key does not exist', () => {
    expect(() => Flow.$Keys({ one: 'one', two: 'two' }).validate('three')).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.$Keys({ one: 'one', two: 'two', three: 3 }).validate(3)).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.$Keys({ one: 'one', two: 'two', three: 3 }).validate(undefined)).toThrow(
      Flow.ValidationError
    );
  });
});
