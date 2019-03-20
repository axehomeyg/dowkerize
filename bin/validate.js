#!/usr/bin/env node
const shell = require("shelljs")
const environmentModule = require('../lib/environment.js')


const reportLine = (key,value) => console.log(key + "\t\t:: " + (value || "---"))

reportLine('Platform', environmentModule.envKey())

reportLine('Project', environmentModule.project())

reportLine('Environment', environmentModule.environment())

reportLine("CI/CD", environmentModule.inCi())

reportLine("docker-sync", environmentModule.usingDockerSync())

Object.entries(
  { "Development Config" : "./docker/development.yml",
  "Test Config" : "./docker/test.yml",
  "UAT Config" : "./docker/uat.yml",
  "Staging Config" : "./docker/staging.yml",
  "Production Config" : "./docker/production.yml",
  "Docker Sync Config" : "./docker/sync.yml",
  "NonSync Volume Config" : "./docker/non-sync.yml"}).forEach(entry => {
  reportLine(
    entry[0],
    shell.test("-f", entry[1]))})

