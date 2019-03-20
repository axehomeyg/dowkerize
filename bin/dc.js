#!/usr/bin/env node

const shell = require("shelljs")

const validCommands = [
  "cmd",
  "docker-compose",
  "purge-branches",
  "purge-tags",
  "stage",
  "sync",
  "validate"]

const help = () => (
  console.log(
    "Usage (dowkerize wrapper):\n" + 
    "\tdc [COMMAND] [COMMAND-ARGS]...\n\n" +
    "Commands:\n" +
    "\tcmd:\t\t\tDockerCompose 'run' within the SERVICE_NAME service\n" +
    "\tdocker-compose:\t\tDockerCompose wrapper\n" +
    "\tpurge_branches:\t\tPurge all merged git branches (skips master/release)\n" +
    "\tpurge_tags:\t\tPurge all git tags (release and Jenkins/CI tags)\n" +
    "\tstage:\t\t\tBuilds docker image with CI/CD options\n" +
    "\tsync:\t\t\tBounces docker-sync\n" +
    "\tvalidate:\t\tValidate current project for dowkerization\n\n" + 
    "docker-compose help following...\n\n"))

const [command, args] = (validCommands.includes(process.argv[2]) ?
  [process.argv[2], process.argv.slice(3)] :
  ['docker-compose', process.argv.slice(2)])

process.argv[2] == 'help' && help()

const script = __dirname + "/../scripts/" + command + ".js"

const fullCommand = script + ' ' + args.join(' ')

return shell.exec(fullCommand)

