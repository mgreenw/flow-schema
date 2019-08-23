// @flow

import { Flow } from '../..';

describe('Union Schema', () => {
  // It should not accept non-schema values
  it('should not pass Flow if a non-Schema is passed in', () => {
    // $ExpectError
    /*:: Flow.union(1); */
    // $ExpectError
    /*:: Flow.union(true); */
    // $ExpectError
    /*:: Flow.union('string'); */
    // $ExpectError
    /*:: Flow.union(null); */
    // $ExpectError
    /*:: Flow.union(undefined); */
    // $ExpectError
    /*:: Flow.union(['one', 'two']); */
    // $ExpectError
    /*:: Flow.union(new Date()); */
    // $ExpectError
    /*:: Flow.union(1, 2, 'three'); */
  });

  it('should properly flow type unions', () => {
    (Flow.union(Flow.number).validate(10): number);
    (Flow.union(Flow.number, Flow.string).validate(10): number | string);
    (Flow.union(Flow.boolean, Flow.number, Flow.void).validate(10): number | void | boolean);

    (Flow.union(
      Flow.Object({ string: Flow.string }),
      Flow.Object({ number: Flow.number })
    ).validate({ string: 'string', number: 10 }): { string: string } | { number: number });
  });

  it('should fail if the value passed in does not match the union', () => {
    expect(() => Flow.union(Flow.number).validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.union(Flow.null).validate('10')).toThrow(Flow.ValidationError);
    expect(() =>
      Flow.union(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number })
      ).validate({ boolean: true })
    ).toThrow(Flow.ValidationError);
    expect(() =>
      Flow.union(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number }),
        Flow.Object({
          obj: Flow.Object({
            test: Flow.void,
          }),
        })
      ).validate({ string: false })
    ).toThrow(Flow.ValidationError);
  });

  it('should succeed if the value passed in matches the defined union', () => {
    expect(Flow.union(Flow.number).validate(10)).toStrictEqual(10);
    expect(Flow.union(Flow.null).validate(null)).toStrictEqual(null);
    expect(
      Flow.union(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number })
      ).validate({ string: 'string' })
    ).toStrictEqual({ string: 'string' });
    expect(
      Flow.union(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number }),
        Flow.Object({
          obj: Flow.Object({
            test: Flow.null,
          }),
        })
      ).validate({ obj: { test: null } })
    ).toStrictEqual({ obj: { test: null } });
  });

  it('should allow for a disjoint union', () => {
    const DJUSchema = Flow.union(
      Flow.Object({
        type: Flow.literal<'number'>('number'),
        number: Flow.number,
      }),
      Flow.Object({
        type: Flow.literal<'boolean'>('boolean'),
        boolean: Flow.boolean,
      }),
      Flow.Object({
        type: Flow.literal<'string'>('string'),
        string: Flow.string,
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
