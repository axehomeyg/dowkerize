#!/usr/bin/env node
// usage: yarn dc:run
const dockerCompose = require("./docker-compose.js").dockerCompose

const runCommand = (args) => (
  "run --rm " +
  (process.env.RUN_ENV || "") + " " +
  args)

const run = (args) => ( 
  dockerCompose(
    runCommand(
      args)))

if(require.main === module) {
  run(process.argv.slice(2).join(' '))

  return 0
}

module.exports = {
  run: run 
}
