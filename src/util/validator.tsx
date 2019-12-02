const isValid = (value: string, ...validators: Function[]) => {
  return validators.every(v => v(value));
};

const isAlphabetic = (val: string) => {
  if (!val.length) {
    return true;
  }
  const match = val.match(/[A-Za-z]/g);
  if (match !== null && match.length === val.length) {
    return true;
  }
  return false;
};

const isNotEmpty = (val: string) => {
  return val.length > 0;
};

export { isValid, isAlphabetic, isNotEmpty };
