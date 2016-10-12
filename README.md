# nginx in container


<br/><a name="basic"></a>
## Basic Usage

### Prerequisites

Docker installation is required.

See
[Install Docker Platform](https://www.docker.com/products/docker)
or
[Docker Toolbox](https://www.docker.com/products/docker-toolbox)


### Build docker image
```
make build  # or ` docker build -t dockerian/ng1nx . `
```

### Run nginx server in Docker container
```
make start  # by default port on 8080
```
or specifying customized port `${PORT}`

```
PORT=9090 make start
```
or manually

```
docker run -it -d --hostname ng1nx --name ng1nx -p 9090:80 dockerian/ng1nx
```

### Run with mapped volume/folder
```
./run.sh ${path-to-dist}  # default to `${PWD}/src`
```

Once the server started, verify it in browser, with port `8080` or specified `${PORT}`:

```
http://localhost:8080
```

### Run with linked container

- Rebuild docker container

  ```
  make clean build  # or ` docker build -t dockerian/ng1nx . `
  ```

- Let another docker container running as, e.g.
  `n0dejs-api` (see [repo](https://github.com/dockerian/n0dejs-api)),
  with port, e.g. `8888`, and verify it is accessible at

  ```
  http://localhost:8888
  ```

- Stop existing container if any

  ```
  make stop
  ```

- Start running `ng1nx` container to link `n0dejs-api`, by

  ```
  PORT=9090 LINK_CONTAINER=n0dejs-api ./run.sh
  ```
  or manually with the following command

  ```
  docker run -it \
  -v $(pwd):/usr/share/nginx/html:ro \
  --expose 80 -p 9090:80 --link n0dejs-api:api \
  --name ng1nx --hostname ng1nx --detach dockerian/ng1nx \
  /etc/nginx/entrypoint.sh
  ```

- Open linked container at (noticing the port)

  ```
  http://localhost:9090/api
  ```



<br/><a name="tutor"></a>
## Learning Matrials

- http://carrot.is/coding/nginx_introduction
- http://nginx.org/en/docs/beginners_guide.html
- http://openresty.org/download/agentzh-nginx-tutorials-en.html
- https://facebook.github.io/react/
