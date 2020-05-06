export default (rememberMe, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'changeUsername':
      return payload;
    default:
      return rememberMe;
  }
};
