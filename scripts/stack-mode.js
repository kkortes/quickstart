import fs from 'fs';
import { exec } from 'child_process';

const [environment] = process.argv.slice(2);

if (
  !environment ||
  (environment !== 'production' && environment !== 'development')
) {
  console.log(
    `Error: no environment was specified\n\nUse format:\nnode ./script/stack-mode.js ENVIRONMENT\n\nENVIRONMENT should be "production" or "development"`
  );
  process.exit(0);
}

const packageJson = fs.readFileSync('package.json');
let json = JSON.parse(packageJson);

Object.entries(json.dependencies).forEach(([dep, path]) => {
  if (dep.includes('@shared')) {
    const replaceWith = environment === 'development' ? '../../' : './';

    const newPath = path.includes('../../')
      ? path.replace('../../', replaceWith)
      : path.replace('./', replaceWith);
    json.dependencies[dep] = newPath;
  }
});

// TODO: Use smart copying, only copy the directories used by dependencies
if (environment === 'production') {
  exec('mkdir -p shared');
  exec('cp -r ../../shared/* shared');
}

if (environment === 'development') {
  exec('rm -R shared');
}

console.log(json);
