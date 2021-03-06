![](https://github.com/hubrise/website/workflows/spec/badge.svg)

# Setup

1. Install docker

2. In console, `cd` to the project root then type:

```shell
export DOCKER_BUILDKIT=1
docker build -f docker_dev/Dockerfile -t hubrise/website-dev .
```

# Development cycle


## Run in development mode

Runs on: http://localhost:8000

Pages are immediately reloaded on code update.

```shell
docker run -t -v $(pwd):/var/www/website -p8000:8000 hubrise/website-dev
docker rm $(docker stop $(docker ps -a -q --filter ancestor=hubrise/website-dev --format="{{.ID}}"))
```

## Run the test suite

```shell
docker run -t -v $(pwd):/var/www/website hubrise/website-dev "yarn test && yarn test:e2e && test:e2e:ci"
```

## Run the production image locally

Runs on: http://localhost:8001

SSR (Server Side Rendering) enabled, no page auto-reload.

```shell
docker build -f Dockerfile -t hubrise/website .
docker run -v $(pwd):/var/www/website -p8001:80 hubrise/website
```

# Production deployment

Same process as a Rails app (see cluster/doc/build_deploy_app.md)
