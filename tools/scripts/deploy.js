const path = require('path')
const {readFileSync, writeFileSync, rmSync} = require('fs')
const semver = require('semver')
const {execSync} = require("child_process");
const chalk = require('chalk');
const [, , name, version, tag = 'next'] = process.argv;
const versions = ['patch', 'pre-patch']
console.log(name, version, tag)

try {
  if (!versions.includes(version)) {
    throw new Error(`Not support version: ${version}, only support [${versions.join(',')}]`)
  }
  const packageJsonPath = path.resolve('packages', name, 'package.json')
  const distFolder = path.resolve('dist', 'packages', name)
  console.log(chalk.bold.green(`Remove old build ${distFolder}`))
  rmSync(distFolder, {recursive: true, force: true});
  const json = JSON.parse(readFileSync(packageJsonPath).toString());
  // console.log(json)
  const oldVersion = json.version
  const nextVersion = semver.inc(json.version, version)
  json.version = nextVersion
  // Save new version
  console.log(chalk.bold.green(`Save new version ${nextVersion}`))
  writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));
  console.log(chalk.bold.green(`Build with new version ${nextVersion}`))
  execSync(`npx nx build ${name}`)
  process.chdir(distFolder);
  execSync(`npm publish --access public --tag ${tag}`);
  console.log(chalk.bold.green(`Upload success ${name}-${nextVersion}`))
} catch (e) {
  console.error(chalk.bold.red(e.message))
}

