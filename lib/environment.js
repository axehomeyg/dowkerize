const shell = require('shelljs')

// Are our docker-compose instances under a custom name
const project = () => process.env.PROJECT_NAME

// Is there a primary service
const service = () => process.env.SERVICE_NAME

// What platform are we using for this service?
const envKey = () => (
  (process.env.RAILS_ENV && "RAILS_ENV") ||
  (process.env.RACK_ENV && "RACK_ENV") ||
  (process.env.NODE_ENV && "NODE_ENV"))


// What environment are we running, (development, test, uat, staging, production)
const environment     = () => process.env.GLOBAL_ENV || process.env[envKey()]

// Are we running inside of a Jenkins CI instance? (master/slave boxes)
const inCi            = () => shell.test('-d', '/var/jenkins_home') || process.argv[0].match(/jenkins/)

// Are we using docker-sync gem for faster i/o on mac/windows
const usingDockerSync  = () => process.env.USE_DOCKER_SYNC

module.exports = {
  envKey: envKey,
  environment: environment,
  inCi: inCi,
  project: project,
  service: service,
  usingDockerSync: usingDockerSync
}
