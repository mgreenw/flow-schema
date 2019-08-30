// @flow

import FS from '../..';

describe('String Constraints', () => {
  it('min', () => {
    expect(() => FS.string.min(10).validate('123456789')).toThrowErrorMatchingSnapshot();
    expect(() => FS.string.min(3.5).validate('123')).toThrowErrorMatchingSnapshot();
    expect(FS.string.min(3).validate('1234')).toBe('1234');

    // Cannot have a negative length for the min
    expect(() => FS.string.min(-10)).toThrowErrorMatchingSnapshot();
  });

  it('max', () => {
    expect(() => FS.string.max(10).validate('12345678910')).toThrowErrorMatchingSnapshot();
    expect(() => FS.string.max(8).validate('123456789101112')).toThrowErrorMatchingSnapshot();
    expect(FS.string.max(3).validate('12')).toBe('12');
    expect(FS.string.max(0).validate('')).toBe('');

    // Cannot have a negative length for the max
    expect(() => FS.string.max(-1)).toThrowErrorMatchingSnapshot();
  });

  it('length', () => {
    expect(() => FS.string.length(10).validate('123456789')).toThrowErrorMatchingSnapshot();
    expect(() => FS.string.length(8).validate('123456789')).toThrowErrorMatchingSnapshot();
    expect(FS.string.length(0).validate('')).toBe('');
    expect(FS.string.length(3).validate('123')).toBe('123');

    // Cannot have a negative length for the length
    expect(() => FS.string.length(-4)).toThrowErrorMatchingSnapshot();
  });

  it('uppercase', () => {
    expect(() => FS.string.uppercase.validate('not ALL UPPERCASE')).toThrowErrorMatchingSnapshot();
    expect(() => FS.string.uppercase.validate('abc123')).toThrowErrorMatchingSnapshot();
    expect(FS.string.uppercase.validate('')).toBe('');
    expect(FS.string.uppercase.validate('123')).toBe('123');
    const result = FS.string.uppercase.validate('IS ALL UPPERCASE');
    (result: string);
    expect(result).toBe('IS ALL UPPERCASE');
  });

  it('lowercase', () => {
    expect(() => FS.string.lowercase.validate('not ALL LOWERCASE')).toThrowErrorMatchingSnapshot();
    expect(() => FS.string.lowercase.validate('ABC123')).toThrowErrorMatchingSnapshot();
    expect(FS.string.lowercase.validate('')).toBe('');
    expect(FS.string.lowercase.validate('123')).toBe('123');
    const result = FS.string.lowercase.validate('is all lowercase');
    (result: string);
    expect(result).toBe('is all lowercase');
  });
});
