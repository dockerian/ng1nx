#!/usr/bin/env bash
########################################################################
# Start ng1nx in container with mapped dist and linked container
#
# Arg $1 - host path to mount on /usr/share/nginx/html in the container
#     $2 - name of a running container to link
#
########################################################################
# set -eo pipefail

set -e
SCRIPT_FILE="${BASH_SOURCE[0]##*/}"
SCRIPT_PATH="$( cd "$( echo "${BASH_SOURCE[0]%/*}" )" && pwd )"


# main function
function main() {
  LINK_FOLDER="${1:-${SCRIPT_PATH}/src}"
  DIST_FOLDER="$(abspath ${LINK_FOLDER})"
  LINK_PSNAME="${2:-${LINK_CONTAINER}}"
  LINK_ASNAME="${LINK_PSNAME##*/}"
  LINK_CONFIG=""
  LINK_OPTION=""
  LINK_SCRIPT=""

  DOCHUB_USER="dockerian"
  DOCKER_IMAG="ng1nx"
  DOCKER_TAGS="${DOCHUB_USER}/${DOCKER_IMAG}"
  RESULT_GREP="$(docker images 2>&1|grep ${DOCKER_TAGS}|awk '{print $1;}')"
  # detect if running inside the container
  DOCKER_PROC="$(cat /proc/1/cgroup 2>&1|grep -e "/docker/[0-9a-z]\{64\}"|head -1)"
  # specify runtime host port, overriding directive EXPOSE port in Dockerfile
  DOCKER_PORT=${PORT:-8080}
  CONFIG_FILE="nginx/nginx.conf"
  CONFIG_TEMP="nginx/nginx.tmpl.conf"
  SHARED_PATH="/usr/share/nginx/html"
  SOURCE_PATH="/usr/local/src"
  SCRIPT_LINK="nginx/entrypoint.sh"
  STREAM_LINK="api"

  cd -P "${SCRIPT_PATH}"

  if [[ -e "/.dockerenv" ]] || [[ "${DOCKER_PROC}" != "" ]]; then
    echo "Docker container '${DOCKER_IMAG}'"
    echo "--------------------------------------------------------------------"
    env|sort
    echo "--------------------------------------------------------------------"
    return
  fi

  if [[ "${RESULT_GREP}" != "${DOCKER_TAGS}" ]]; then
    echo -e "\n"
    echo `date +%Y-%m-%d:%H:%M:%S` "Building docker image '${DOCKER_TAGS}' ..."
    echo "--------------------------------------------------------------------"
    docker build -t ${DOCKER_TAGS} . | tee docker_build.log
    echo "--------------------------------------------------------------------"
  fi

  echo `date +%Y-%m-%d:%H:%M:%S` "Killing docker container '${DOCKER_IMAG}'"
  docker rm -f -v ${DOCKER_IMAG} 2>/dev/null || true

  # For linking container, add
  #   --link ${LINK_PSNAME}:${LINK_ASNAME} \
  # to $CMD
  if [[ "${LINK_PSNAME}" != "" ]]; then
    LINK_CONFIG="-v ${SCRIPT_PATH}/${CONFIG_FILE}:/etc/${CONFIG_FILE}"
    LINK_OPTION="--link ${LINK_PSNAME}:${STREAM_LINK}"
    LINK_SCRIPT="/etc/${SCRIPT_LINK}"
  fi

  CMD="docker run -it \
  --name ${DOCKER_IMAG} --hostname ${DOCKER_IMAG} \
  --detach --expose 80 --publish ${DOCKER_PORT}:80 ${LINK_OPTION} \
  -v "${SCRIPT_PATH}/${SCRIPT_LINK}":"/etc/${SCRIPT_LINK}" \
  -v "${DIST_FOLDER}":"${SHARED_PATH}":ro \
  -v "${SCRIPT_PATH}":"${SOURCE_PATH}" \
  ${DOCKER_TAGS} ${LINK_SCRIPT}"

  echo `date +%Y-%m-%d:%H:%M:%S` "Running docker container '${DOCKER_IMAG}'"
  echo "--------------------------------------------------------------------"
  echo "${CMD}"
  echo "--------------------------------------------------------------------"
  ${CMD}
  echo ""
  if [[ "${LINK_PSNAME}" != "" ]]; then
  echo "Linking to proc: ${LINK_PSNAME}"
  fi
  echo "Mapping to path: ${DIST_FOLDER}:${SHARED_PATH}:ro"
  echo "                 ${SCRIPT_PATH}:${SOURCE_PATH}"
  echo "Serving on port: ${DOCKER_PORT}"
  echo ""
}

############################################################
# function: Output a relative path to absolute path
############################################################
function abspath() {
  local relPath="$@"
  local thePath
  if [[ ! "$relPath" =~ ^/ ]]; then
    thePath="$PWD/$relPath"
  else
    thePath="$relPath"
  fi
  echo "$thePath"|(
  IFS=/
  read -a parr
  declare -a outp
  for i in "${parr[@]}";do
    case "$i" in
    ''|.) continue ;;
    ..)
      len=${#outp[@]}
      if ((len!=0));then unset outp[$((len-1))]; else continue; fi
      ;;
    *)
      len=${#outp[@]}
      outp[$len]="$i"
      ;;
    esac
  done
  echo /"${outp[*]}"
  )
}


[[ $0 != "${BASH_SOURCE}" ]] || main "$@"
