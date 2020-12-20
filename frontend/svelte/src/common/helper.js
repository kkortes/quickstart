const compare = (a, b) => {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export { compare, sleep };
