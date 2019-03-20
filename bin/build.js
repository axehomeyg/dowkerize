#!/usr/bin/env node
// usage: yarn dc:build production 
const dockerCompose = require("./docker-compose.js").dockerCompose

const deployEnvironment = () => process.argv[2] || ""

const deployService     = () => process.argv[3] || ""

dockerCompose(`build ${deployService()}`, {GLOBAL_ENV: deployEnvironment()})
