#!/usr/bin/env node

var shell = require('shelljs');

// branches, not master/release, already merged
shell
  .exec('git branch -r --merged')
  .grep('-v', /^\*|origin\/master|origin\/release/)
  .sed(/origin\//, '')
  .exec('xargs -n 1 echo git push --delete origin')

