# Installation

```
nvm use
npm install
npm run boostrap
```

## Starting all apps

```
npm run dev
```

## Starting an app individually

```
cd frontend/<appname>
OR
cd backend/<appname>

npm run dev
```

## Features

- ✅ Socket server to handle any request
- ✅ Debounced user progress storage
- ✅ Account log in
- ✅ Account creation
- ✅ Tab reload and duplicate prevention
- ✅ Duplicate user session prevention
- ✅ Notification center
- ✅ "Eject"-script `npm run eject` for easier hosting
- ❌ Heroku backend hosting setup
- ❌ Vercel frontend hosting setup
- ❌ Persistant and safe localStorage
- ❌ Password recovery via email

### Todo

- Get rid of `proptypes` dependency
- Get rid of `classnames` dependency
- Get rid of `react-transition-group` dependency
- Make it so that `<Crow />` can handle `null` (not creating white space)
- Get eslint to work by ignoring all `node_module`-directories in subfolders

### Switch snippet

```
((type) => {
  switch (type) {
    case 'success':
      return 'something';
    default:
      return type;
  }
})(type)
```
