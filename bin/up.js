#!/usr/bin/env node

const dockerCompose = require("./docker-compose.js").dockerCompose

dockerCompose("up " + process.argv.slice(2).join(' '))
