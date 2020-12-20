import lodash from 'lodash';
const { mergeWith, isArray, unionWith, isEqual } = lodash;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const deepMerge = (object, mergeObject) =>
  mergeWith(mergeObject, object, (a, b) =>
    isArray(a) ? unionWith(isEqual, a, b) : undefined
  );

export { sleep, validateEmail, deepMerge };
