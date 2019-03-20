#!/usr/bin/env node
const dockerCompose = require("../docker-compose.js").dockerCompose

dockerCompose("down --remove-orphans")
