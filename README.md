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
- ❌ Heroku backend hosting setup
- ❌ Vercel frontend hosting setup
- ❌ Persistant and safe localStorage
- ❌ Password recovery via email

## Setting up new Heroku server instance deployment

`$NAME = example-name`
`$PROCFILEDIR = server/example-dir`

`heroku create -a $NAME --region eu`

`heroku buildpacks:add -a $NAME https://github.com/heroku/heroku-buildpack-multi-procfile`

`heroku config:set -a $NAME PROCFILE=$PROCFILEFIR/Procfile`

`git push https://git.heroku.com/$NAME.git HEAD:master`

## Deploy server/\*/index.js to Heroku, one-by-one

`git push worldseed-socket master`

## Deploy server/\*/index.js to Heroku master from branch

`git push worldseed-* $BRANCHNAME:master`

### Todo

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
