# Docker

## Redis

These are instruction how to run the standard docker [image](https://docs.docker.com/samples/library/redis/).

### Preparation

Create the data directory

```
mkdir c:\dev\docker\data
```

### Docker commands

Search for the Redis image

```
docker search redis
```

Pull the sameersbn/redis image from the registry

```
docker pull sameersbn/redis:4.0.9-2
```

Create a volume to persist data

```
docker volume create redis-data-test
```

List the volumes

```
docker volume ls
```

Inspect the volume

```
docker volume inspect redis-data-test
```

Run the Redis image on port 6379 using the created volume

```
docker run --name redis -d --restart=always --publish 6379:6379 --mount source=redis-data-test,target=/data sameersbn/redis:4.0.9-2
```

Inspect the container

```
docker inspect redis
```

List running docker containers, the `-a` option lists running and stopped containers

```
docker ps -a
```

Stop the docker container

```
docker stop redis
```

Start the docker container

```
docker start redis
```

Remove a container

```
docker rm redis
```

## Additional commands

Listing images

```
docker images
```

View information about the Docker installation

```
docker info
```

List the Docker networks

```
docker network ls
```

## References

- [Docker cheat sheet](https://dockercheatsheet.painlessdocker.com/)
- [Docker Use Volumes](https://docs.docker.com/storage/volumes/)
