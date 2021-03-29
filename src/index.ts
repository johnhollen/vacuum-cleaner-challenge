interface Test {
  foo: string;
}

export const testFn = (): Test => {
  return {
    foo: 'bar',
  };
};
