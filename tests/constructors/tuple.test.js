// @flow

import { Flow } from '../..';

describe('Tuple Schema', () => {
  // It should not accept non-schema values
  it('should not pass Flow if a non-Schema is passed in', () => {
    // $ExpectError
    /*:: Flow.tuple(1); */
    // $ExpectError
    /*:: Flow.tuple(true); */
    // $ExpectError
    /*:: Flow.tuple('string'); */
    // $ExpectError
    /*:: Flow.tuple(null); */
    // $ExpectError
    /*:: Flow.tuple(undefined); */
    // $ExpectError
    /*:: Flow.tuple(['one', 'two']); */
    // $ExpectError
    /*:: Flow.tuple(new Date()); */
    // $ExpectError
    /*:: Flow.tuple(1, 2, 'three'); */
    (Flow.tuple(Flow.number).validate([10]): [number]);
    (Flow.tuple(Flow.string, Flow.boolean).validate(['str', true]): [string, boolean]);
  });

  it('should pass flow and validate properly with a well-defined tuple', () => {
    let result;
    result = Flow.tuple(Flow.string).validate(['string']);
    (result: [string]);
    expect(result).toStrictEqual(['string']);

    result = Flow.tuple(Flow.boolean, Flow.number).validate([true, 10]);
    (result: [boolean, number]);
    expect(result).toStrictEqual([true, 10]);

    result = Flow.tuple(Flow.null, Flow.Object({ void: Flow.void })).validate([
      null,
      { void: undefined },
    ]);
    (result: [null, { void: void }]);
    expect(result).toStrictEqual([null, { void: undefined }]);
  });

  it('should fail if the tuple length is different from the schema', () => {
    expect(() => Flow.tuple(Flow.string).validate(['string', true])).toThrow(Flow.ValidationError);
    expect(() => Flow.tuple(Flow.boolean, Flow.number).validate([true, 10, true])).toThrow(
      Flow.ValidationError
    );
    expect(() =>
      Flow.tuple(Flow.null, Flow.Object({ void: Flow.void })).validate([
        null,
        { void: undefined },
        true,
      ])
    ).toThrow(Flow.ValidationError);
  });

  // it('should fail if the tuple values do not match the schema', () => {});
  // It should throw if the values are ba
});
