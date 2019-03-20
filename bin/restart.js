#!/usr/bin/env node
const dockerCompose = require("./docker-compose.js").dockerCompose

dockerCompose("restart " + process.argv.slice(2).join(' '))
