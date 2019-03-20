# Docker/Microservice Wrappers

## Instructions
### Ensure the following parameters exist

* Environment Variables:
  * (RAILS_ENV | NODE_ENV | RACK_ENV) values (development, test, uat, staging, production)
  * PROJECT_NAME : used to namespace your images for predictable CD build
  * SERVICE_NAME : used to have an explicit default for primary service in a large docker-compose stack

* Files:
  * Dockerfile/docker-compose.yml
  * ./docker/(development.yml, test, uat, staging, production)
  * ./docker/(sync.yml, non-sync.yml) (for Docker Sync usage)
