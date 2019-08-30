// @flow

import FS from '../..';

describe('Union Schema', () => {
  // It should not accept non-schema values
  it('should not pass Flow if a non-Schema is passed in', () => {
    // $ExpectError
    /*:: FS.union(1); */
    // $ExpectError
    /*:: FS.union(true); */
    // $ExpectError
    /*:: FS.union('string'); */
    // $ExpectError
    /*:: FS.union(null); */
    // $ExpectError
    /*:: FS.union(undefined); */
    // $ExpectError
    /*:: FS.union(['one', 'two']); */
    // $ExpectError
    /*:: FS.union(new Date()); */
    // $ExpectError
    /*:: FS.union(1, 2, 'three'); */
  });

  it('should properly flow type unions', () => {
    (FS.union(FS.number).validate(10): number);
    (FS.union(FS.number, FS.string).validate(10): number | string);
    (FS.union(FS.boolean, FS.number, FS.void).validate(10): number | void | boolean);

    (FS.union(FS.Object({ string: FS.string }), FS.Object({ number: FS.number })).validate({
      string: 'string',
      number: 10,
    }): { string: string } | { number: number });
  });

  it('should fail if the value passed in does not match the union', () => {
    expect(() => FS.union(FS.number).validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.union(FS.null).validate('10')).toThrow(FS.ValidationError);
    expect(() =>
      FS.union(FS.Object({ string: FS.string }), FS.Object({ number: FS.number })).validate({
        boolean: true,
      })
    ).toThrow(FS.ValidationError);
    expect(() =>
      FS.union(
        FS.Object({ string: FS.string }),
        FS.Object({ number: FS.number }),
        FS.Object({
          obj: FS.Object({
            test: FS.void,
          }),
        })
      ).validate({ string: false })
    ).toThrow(FS.ValidationError);
  });

  it('should succeed if the value passed in matches the defined union', () => {
    expect(FS.union(FS.number).validate(10)).toStrictEqual(10);
    expect(FS.union(FS.null).validate(null)).toStrictEqual(null);
    expect(
      FS.union(FS.Object({ string: FS.string }), FS.Object({ number: FS.number })).validate({
        string: 'string',
      })
    ).toStrictEqual({ string: 'string' });
    expect(
      FS.union(
        FS.Object({ string: FS.string }),
        FS.Object({ number: FS.number }),
        FS.Object({
          obj: FS.Object({
            test: FS.null,
          }),
        })
      ).validate({ obj: { test: null } })
    ).toStrictEqual({ obj: { test: null } });
  });

  it('should allow for a disjoint union', () => {
    const DJUSchema = FS.union(
      FS.Object({
        type: FS.literal<'number'>('number'),
        number: FS.number,
      }),
      FS.Object({
        type: FS.literal<'boolean'>('boolean'),
        boolean: FS.boolean,
      }),
      FS.Object({
        type: FS.literal<'string'>('string'),
        string: FS.string,
      })
    );

    const result = DJUSchema.validate({ type: 'number', number: 123 });
    switch (result.type) {
      case 'number':
        (result.number: number);
        // $ExpectError should be missing
        (result.boolean: boolean);
        // $ExpectError should be missing
        (result.string: empty);
        expect(result.number).toBe(123);
        break;
      case 'boolean':
        (result.boolean: boolean);
        // $ExpectError should be missing
        (result.number: empty);
        // $ExpectError should be missing
        (result.string: empty);
        throw new Error('Should never get here');
      case 'string':
        (result.string: string);
        // $ExpectError should be missing
        (result.boolean: empty);
        // $ExpectError should be missing
        (result.number: empty);
        throw new Error('Should never get here');
      default:
        (result: empty); // Complete case analysis exhaustion
        throw new Error('Should never get here');
    }
  });
});
