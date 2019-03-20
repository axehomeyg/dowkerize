#!/usr/bin/env node
const shell = require("shelljs")

if(!shell.which("docker-sync")) {
  console.log("Install docker-sync w/ 'gem install docker-sync'")
  process.exit(1)
}

// Use this to bounce sync services (for Mac/Windows development with flaky unison)
shell.exec("docker-sync stop")
shell.exec("docker-sync start")
shell.exec("docker-sync logs -f")
