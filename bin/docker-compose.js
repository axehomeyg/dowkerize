#!/usr/bin/env node

// Environment Variables
// RAILS_ENV | NODE_ENV | RACK_ENV
// GLOBAL_ENV (overrides the above)
// PROJECT_NAME
// SERVICE_NAME
// USE_DOCKER_SYNC
const DEBUG = true

const log = (...msgs) => DEBUG && console.log(...msgs)

const shell = require("shelljs")

const environmentModule = require("../lib/environment.js")

// Get default environment
const environment     = () => environmentModule.environment() || 'development'

// In case we're given a forced environment for all platforms
const environmentPrefix = () => {
  const globalEnv = process.env.GLOBAL_ENV

  return globalEnv ?
    (`RAILS_ENV=${process.env.RAILS_ENV || globalEnv} ` +
     `RACK_ENV=${process.env.RACK_ENV || globalEnv} ` +
      `NODE_ENV=${process.env.NODE_ENV || globalEnv} `) : "" }

// Are we using docker-sync gem for faster i/o on mac/windows
const dockerSyncConfig = () => (
  environmentModule.usingDockerSync() ?
    "-f docker/sync.yml" :
    (environmentModule.inCi() ? "" : "-f docker/non-sync.yml"))

// Let's build the full docker-compose config that we need
const dockerConfig = env => `-f docker-compose.yml ${dockerSyncConfig()} -f docker/${env}.yml`

const argsContainProject = () => process.argv.find(arg => arg.match(/-p/))

const dockerProject = () => (
  (environmentModule.project() && !argsContainProject()) ?
    `-f ${environmentModule.project()}` : "")

// Execute the given command with our docker-compose wrapper
const dockerCompose = (cmd, envObj) => {
  if(envObj) {
    Object
      .entries(envObj)
      .forEach(obj => {
        shell.env[obj[0]] = obj[1]})}

  const fullCommand = (
    `${environmentPrefix()}docker-compose ${dockerProject()} ${dockerConfig(environment())} ${cmd}`
  )

  return shell.exec(fullCommand)
}

if(require.main === module) {
  return dockerCompose(process.argv.slice(2).join(' '))
}

module.exports = {
  dockerCompose: dockerCompose
}
