# Makefile for ng1nx

HUB_ACCOUNT := dockerian
DOCKER_IMAG := ng1nx
DOCKER_TAGS := $(HUB_ACCOUNT)/$(DOCKER_IMAG)

PORT ?= 8080
DOCKER_EXEC := docker exec -it $(DOCKER_IMAG) /bin/bash
DOCKER_ARG1 := -it -d --hostname $(DOCKER_IMAG) --name $(DOCKER_IMAG)
DOCKER_ARG2 := -p $(PORT):80 -v $(PWD):/usr/local/src
DOCKER_ARGS := $(DOCKER_ARG1) $(DOCKER_ARG2)
DOCKER_RUNP := docker run $(DOCKER_ARGS) $(DOCKER_TAGS)
DOCKER_STOP := docker rm -f -v $(DOCKER_IMAG)

.PHONY: build check exec run stat start stop
default: check

docker_build.log: Dockerfile src/*
ifeq ("$(wildcard /.dockerenv)","")
	# make in a docker host environment
	@echo ""
	@echo `date +%Y-%m-%d:%H:%M:%S` "Building '$(DOCKER_TAGS)'"
	@echo "----------------------------------------------------------------"
	docker build -t $(DOCKER_TAGS) . | tee docker_build.log
	@echo "----------------------------------------------------------------"
	@echo ""
	docker images --all | grep -e 'REPOSITORY' -e '$(DOCKER_TAGS)'
	@echo "................................................................"
	@echo "DONE: {docker build}"
else
	@echo "Cannot make build inside docker container"
endif
	@echo ""

build: docker_build.log


check:
ifneq ("$(wildcard /.dockerenv)","")
	@echo "Docker container env:"
	@echo "----------------------------------------------------------------"
	@env|sort
	@echo "----------------------------------------------------------------"
else
	@echo "pwd: $(shell pwd)"
endif


clean: stop clean-docker
	rm -rf docker_build.log

clean-docker:
ifeq ("$(wildcard /.dockerenv)","")
	docker rm -f $(docker ps -a|grep ${DOCKER_IMAG}|awk '{print $1}') 2>/dev/null || true
	docker rmi -f $(docker images -a|grep ${DOCKER_TAGS} 2>&1|awk '{print $1}') 2>/dev/null || true
endif


exec:
ifeq ("$(wildcard /.dockerenv)","")
	@echo "$(DOCKER_EXEC)"
	@echo "----------------------------------------------------------------"
	@ $(DOCKER_EXEC) || true
	@echo "----------------------------------------------------------------"
	@echo "DONE: [$@]"
	@echo ""
endif


run start: stop build
ifeq ("$(wildcard /.dockerenv)","")
	@echo "$(DOCKER_RUNP)"
	@echo "----------------------------------------------------------------"
	@ $(DOCKER_RUNP) || true
	@echo "----------------------------------------------------------------"
	@echo "Serving on port: $(PORT)"
	@echo "DONE: [$@]"
else
	service nginx restart
endif


stat:
	@echo ""
	netstat -lantp tcp
	@echo "................................................................"
	ps -aef
	@echo "................................................................"
ifeq ("$(wildcard /.dockerenv)","")
	docker ps -a
	@echo "................................................................"
endif
	@echo "DONE: [$@]"


stop:
ifeq ("$(wildcard /.dockerenv)","")
	@echo "$(DOCKER_STOP)"
	@echo "----------------------------------------------------------------"
	@ $(DOCKER_STOP) || true
	@echo "----------------------------------------------------------------"
	@echo "DONE: [$@]"
	@echo ""
endif
