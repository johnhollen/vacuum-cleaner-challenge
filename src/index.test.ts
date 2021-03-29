import { testFn } from '.';

describe('initial setup', () => {
  it('should run a test', () => {
    expect(testFn()).toEqual({
      foo: 'bar',
    });
  });
});
