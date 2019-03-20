#!/usr/bin/env node
var shell = require('shelljs');

// branches, not master/release, already merged
shell
  .exec('git tag -l')
  .exec('xargs -n 1 echo git push --delete origin')

shell
  .exec('git tag')
  .exec('xargs -n 1 echo git tag -d')
