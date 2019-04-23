# Redis test

This is a test project how to use queues to handle actions that must run, but do not need to run immediately. It makes use of the [producer consumer queue pattern](https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem) with [Node](https://nodejs.org) and [Redis](https://redis.io/). The queue is persisted, so that no messages are lost.

It is also a discovery how to set this up using [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

**IMPORTANT** This repository has been updated to secure both Redis and Redis Commander. If running the examples from the commandline please set the commandline argument `REDIS_PASSWORD` to the value set in the `.env` file. That file also specifies the username and password required by Redis Commander.  

## Start Redis and Redis Commander

Use the included docker compose file `docker-compose.yml` to start Redis and Redis Commander.

```
docker-compose up redis redis-commander
```

This command starts the docker containers in the foreground. To exit use `ctrl+c`. To start the docker containers in the background use the `-d` flag (`docker-compose up -d`) and `docker-compose ps` to see what is currently running.
 
Redis is accessible on `localhost` on port `6379`. Redis Commander is accessible at `http://localhost:8081`.

If you started Compose with `docker-compose up -d`, stop your services with:

```
docker-compose stop
```

Bring everything down, removing the containers entirely, with the down command. Pass `--volumes` to also remove the data volume used by the Redis container:

```
docker-compose down --volumes
```

## Run examples

### Install

Install the dependencies with:

```
npm install
```

### Basic example

The first example is a very basic plain vanilla Node Redis implementation that uses the module `redis`.

The example is located in `examples/basic`.

To run it execute:
 
```
node examples/basic/index.js
```

What does it do? Nothing to fancy:

1. It creates a key that is persisted
2. It creates a key that expires after 1 second and is automatically removed from Redis

### Producer consumer example

This is were it gets a little more interesting. This example uses the module `redis-smq`, which provides a very straight forward queue implementation.

The example is located in `examples/producer-consumer`. To run it execute the following scripts in order:

1. The monitor

    The monitor is a very basic web interface that you can monitor the producers and consumers with.
    
    - Start it with `node examples/producer-consumer/monitor.js` or `npm run run:monitor`
    - Open a browser and go to `http://localhost:3000` 

2. The producer

    The producer generates 1000 random messages and sends them to the queue named `test_queue`. The Messages types are: sms and email.
    
    Start it with:
    
    ```
    node examples/producer-consumer/producer.js
    ```

    or
    
    ```
    npm run run:producer
    ```
     
    After the messages are generated the producer exits.
    
3. The consumer

    The consumer receives messages from the queue named `test_queue`.  
    Start it with:
    
    ```
    node examples/producer-consumer/consumer.js
    ```

    or
    
    ```
    npm run run:producer
    ```

    After the messages are consumed it continues to wait until exited with `ctrl+c`.

## Run examples with Docker

Build the Docker image with:

```
docker build -t nidkil/redis-test .
```

Check that the image is listed:

```
docker images
```

Run the image:

```
docker run --name redis-test -p 3000:3000 -d nidkil/redis-test
```

Display the output of the app:

```
# Print app output
$ docker logs redis-test
```

If you need to access the running container use the `exec` command:

```
# Enter the container
$ docker exec -it redis-test /bin/bash
```

## Using Docker Compose

The included Docker Compose file handles starting up three containers Redis, Redis Commander and RedisSMQ. The RedisSMQ container runs the RedisSMQ Monitor and RedisSMQ Consumer. The RedisSMQ Producer must be run separately to generate the messages.

**IMPORTANT** Docker Compose does not automatically pickup changes in the source code. If you make changes you need to force a docker build using the `--build` flag.

Start the containers:

```
docker-compose up --build
```

**IMPORTANT** Changes to the source code or Dockerfile are not picked up automatically by Docker Compose. You need to restart with the `--build` flag, e.g. `docker-compose up --build`. 

To start the producer:

1. First get the network the containers started by Docker Compose are running on.

    List the Docker networks
    
    ```
    docker network ls
    ```

2. Start a new container with the RedisSMQ Producer using the same network used by the other containers. 

    ```
    docker run --env REDIS_HOST=redis --env REDIS_PASSWORD=secret --network=redis-test_default -it --entrypoint=/bin/bash nidkil/redis-test -c "node /var/redis-test/examples/producer-consumer/producer.js" 
    ```

## References

- [Redis](https://redis.io/)
- [docker-redis](https://github.com/sameersbn/docker-redis)
- [Redis Commander](https://github.com/joeferner/redis-commander)
- [Docker cheat sheet](https://dockercheatsheet.painlessdocker.com/)
- [RedisSMQ](https://github.com/weyoss/redis-smq)
- [Advanced Docker Compose configuration](https://runnable.com/docker/advanced-docker-compose-configuration)
- [Docker ARG, ENV and .env - a Complete Guide](https://vsupalov.com/docker-arg-env-variable-guide/)

## Check it out

- [wait-for-it](https://github.com/vishnubob/wait-for-it)
- [dockerize](https://github.com/jwilder/dockerize)
