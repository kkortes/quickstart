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

```
cd packages/api && heroku create <NAME> --region eu
heroku buildpacks:add -a <NAME> heroku/nodejs
heroku buildpacks:add -a <NAME> https://github.com/Pagedraw/heroku-buildpack-select-subdir
heroku git:remote -a <NAME>

git subtree push --prefix <PATH/TO/PROJECT> heroku master

git push heroku master

```


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
