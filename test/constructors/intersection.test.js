// @flow

import FS from '../..';

describe('Intersection Schema', () => {
  // It should not accept non-schema values
  it('should not pass Flow if a non-Schema is passed in', () => {
    // $ExpectError
    /*:: FS.intersection(1); */
    // $ExpectError
    /*:: FS.intersection(true); */
    // $ExpectError
    /*:: FS.intersection('string'); */
    // $ExpectError
    /*:: FS.intersection(null); */
    // $ExpectError
    /*:: FS.intersection(undefined); */
    // $ExpectError
    /*:: FS.intersection(['one', 'two']); */
    // $ExpectError
    /*:: FS.intersection(new Date()); */
    // $ExpectError
    /*:: FS.intersection(1, 2, 'three'); */
  });

  it('should properly flow type intersections', () => {
    (FS.intersection(FS.number).validate(10): number);
    // This can't happen but it technically allowed in FS.
    /*:: (FS.intersection(FS.number, FS.string).validate(10): number & string); */
    (FS.intersection(FS.Object({ string: FS.string }), FS.Object({ number: FS.number })).validate({
      string: 'string',
      number: 10,
    }): { string: string, number: number });
  });

  it('should fail if the intersection is impossible', () => {
    expect(() => FS.intersection(FS.number, FS.string).validate(10)).toThrow(FS.ValidationError);
    expect(() => FS.intersection(FS.number, FS.null).validate(null)).toThrow(FS.ValidationError);
    expect(() =>
      FS.intersection(FS.Object({ test: FS.string }), FS.Object({ test: FS.number })).validate({
        test: 'string',
      })
    ).toThrow(FS.ValidationError);
  });

  it('should fail if the value passed in does not match the intersection', () => {
    expect(() => FS.intersection(FS.number).validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.intersection(FS.null).validate('10')).toThrow(FS.ValidationError);
    expect(() =>
      FS.intersection(FS.Object({ string: FS.string }), FS.Object({ number: FS.number })).validate({
        string: 'string',
      })
    ).toThrow(FS.ValidationError);
    expect(() =>
      FS.intersection(
        FS.Object({ string: FS.string }),
        FS.Object({ number: FS.number }),
        FS.Object({
          obj: FS.Object({
            test: FS.void,
          }),
        })
      ).validate({ string: 'string', number: 10, obj: { test: FS.string } })
    ).toThrow(FS.ValidationError);
  });

  it('should succeed if the value passed in matches the defined intersection', () => {
    expect(FS.intersection(FS.number).validate(10)).toStrictEqual(10);
    expect(FS.intersection(FS.null).validate(null)).toStrictEqual(null);
    expect(
      FS.intersection(FS.Object({ string: FS.string }), FS.Object({ number: FS.number })).validate({
        string: 'string',
        number: 10,
      })
    ).toStrictEqual({ string: 'string', number: 10 });
    expect(
      FS.intersection(
        FS.Object({ string: FS.string }),
        FS.Object({ number: FS.number }),
        FS.Object({
          obj: FS.Object({
            test: FS.null,
          }),
        })
      ).validate({ string: 'string', number: 10, obj: { test: null } })
    ).toStrictEqual({ string: 'string', number: 10, obj: { test: null } });
  });
});
