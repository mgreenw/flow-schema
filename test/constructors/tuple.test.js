// @flow

import FS from '../..';

describe('Tuple Schema', () => {
  // It should not accept non-schema values
  it('should not pass Flow if a non-Schema is passed in', () => {
    // $ExpectError
    /*:: FS.tuple(1); */
    // $ExpectError
    /*:: FS.tuple(true); */
    // $ExpectError
    /*:: FS.tuple('string'); */
    // $ExpectError
    /*:: FS.tuple(null); */
    // $ExpectError
    /*:: FS.tuple(undefined); */
    // $ExpectError
    /*:: FS.tuple(['one', 'two']); */
    // $ExpectError
    /*:: FS.tuple(new Date()); */
    // $ExpectError
    /*:: FS.tuple(1, 2, 'three'); */
    (FS.tuple(FS.number).validate([10]): [number]);
    (FS.tuple(FS.string, FS.boolean).validate(['str', true]): [string, boolean]);
  });

  it('should pass flow and validate properly with a well-defined tuple', () => {
    let result;
    result = FS.tuple(FS.string).validate(['string']);
    (result: [string]);
    expect(result).toStrictEqual(['string']);

    result = FS.tuple(FS.boolean, FS.number).validate([true, 10]);
    (result: [boolean, number]);
    expect(result).toStrictEqual([true, 10]);

    result = FS.tuple(FS.null, FS.Object({ void: FS.void })).validate([null, { void: undefined }]);
    (result: [null, { void: void }]);
    expect(result).toStrictEqual([null, { void: undefined }]);
  });

  it('should fail if the tuple length is different from the schema', () => {
    expect(() => FS.tuple(FS.string).validate(['string', true])).toThrow(FS.ValidationError);
    expect(() => FS.tuple(FS.boolean, FS.number).validate([true, 10, true])).toThrow(
      FS.ValidationError
    );
    expect(() =>
      FS.tuple(FS.null, FS.Object({ void: FS.void })).validate([null, { void: undefined }, true])
    ).toThrow(FS.ValidationError);
  });

  it('should fail if the tuple values do not match the schema', () => {
    expect(() => FS.tuple(FS.string).validate([{ string: 'string' }])).toThrow(FS.ValidationError);
    expect(() => FS.tuple(FS.boolean, FS.number).validate([true, true])).toThrow(
      FS.ValidationError
    );
    expect(() =>
      FS.tuple(FS.null, FS.Object({ void: FS.void })).validate([
        null,
        { void: true, other: undefined },
      ])
    ).toThrow(FS.ValidationError);
  });
});
