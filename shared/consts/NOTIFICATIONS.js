const PASSWORD_INCORRECT = {
  title: 'password incorrect',
  text: 'the password you provided was incorrect',
  type: 'error',
};
const NETWORK_TIMEOUT = {
  title: 'network timeout',
  text: 'connection took too long, please check your internet connection',
  type: 'error',
};
const NETWORK_ERROR = {
  title: 'network error',
  text: 'could not connect to server',
  type: 'error',
};
const ACCOUNT_EXISTS = {
  title: 'account exists',
  text: 'an account with that email address already exists',
  type: 'error',
};
const USERNAME_TAKEN = {
  title: 'username taken',
  text: 'that username is already taken',
  type: 'error',
};
const STATE_STORED = {
  title: 'state stored',
  text: 'your game state was successfully stored',
  type: 'info',
};
const ACCOUNT_LOGGED_OUT = {
  title: 'logged out',
  text: 'you logged out',
  type: 'info',
};
const EMAIL_INVALID = {
  title: 'invalid email address',
  text: 'the email adress you provided is invalid',
  type: 'info',
};
const PASSWORD_MISSING = {
  title: 'password missing',
  text: 'you need to submit a password',
  type: 'info',
};
const ACCOUNT_CREATED = {
  title: 'account created',
  text: 'account was sucessfully created!',
  type: 'success',
};
const ACCOUNT_LOGGED_IN = {
  title: 'logged in',
  text: 'welcome',
  type: 'success',
};
const ACCOUNT_LOGGED_IN_ELSEWHERE = {
  title: 'logged in elsewhere',
  text: 'your account logged in from elsewhere',
  type: 'info',
};

export {
  PASSWORD_INCORRECT,
  NETWORK_TIMEOUT,
  NETWORK_ERROR,
  ACCOUNT_EXISTS,
  USERNAME_TAKEN,
  STATE_STORED,
  ACCOUNT_LOGGED_OUT,
  EMAIL_INVALID,
  PASSWORD_MISSING,
  ACCOUNT_CREATED,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_IN_ELSEWHERE,
};
