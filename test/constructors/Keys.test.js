/* eslint-disable flowtype/generic-spacing */
// @flow

import FS from '../..';

describe('$ReadOnly Schema', () => {
  // It should not accept non-schema values
  it('should properly extract the keys into a union', () => {
    const objOne = { one: 'one', two: 'two' };
    (FS.$Keys(objOne).validate('one'): $Keys<typeof objOne>);
    const objTwo = { one: 'one', two: 'two', three: 3 };
    (FS.$Keys(objTwo).validate('one'): $Keys<typeof objTwo>);
    // $ExpectError
    (FS.$Keys({ one: 'one', two: 'two', three: 3 }).validate('one'): 'one' | 'two' | 3);
  });

  it('should pass validation if the key exists in the object', () => {
    expect(FS.$Keys({ one: 'one', two: 'two' }).validate('one')).toBe('one');
    expect(FS.$Keys({ one: 'one', two: 'two', three: 3 }).validate('three')).toBe('three');
    expect(FS.$Keys({ one: 'one', two: 'two', three: 3 }).validate('one')).toBe('one');
  });

  it('should fail validation if the key does not exist', () => {
    expect(() => FS.$Keys({ one: 'one', two: 'two' }).validate('three')).toThrow(
      FS.ValidationError
    );
    expect(() => FS.$Keys({ one: 'one', two: 'two', three: 3 }).validate(3)).toThrow(
      FS.ValidationError
    );
    expect(() => FS.$Keys({ one: 'one', two: 'two', three: 3 }).validate(undefined)).toThrow(
      FS.ValidationError
    );
  });
});
