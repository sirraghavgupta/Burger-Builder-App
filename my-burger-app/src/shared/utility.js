export const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required && isValid) {
    isValid = value.trim() !== '';
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength;
  }

  if (rules.maxLength && isValid) {
    isValid = value.length <= rules.maxLength;
  }

  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (rules.isEmail && isValid) {
    isValid = pattern.test(value);
  }

  return isValid;
};
