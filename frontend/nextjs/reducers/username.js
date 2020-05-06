export default (username, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'changeUsername':
      return payload;
    default:
      return username;
  }
};
