#!/usr/bin/env bash
########################################################################
# Start nginx with a template, e.g. /etc/nginx/nginx.template.conf
########################################################################
set -eo pipefail

function main() {
  NGINX_LINK="$(env|grep 'API_\(ENV_\)\?PORT')"
  NGINX_TMPL="/etc/nginx/nginx.tmpl.conf"
  NGINX_CONF="/etc/nginx/nginx.conf"

  if [[ -f "${NGINX_TMPL}" ]] && [[ "${NGINX_LINK}" != "" ]]; then
    echo "Substituting environment vars in '${NGINX_TMPL}'"
    echo "-----------------------------------------------------------------"
    # (set -o posix; set)
    env | sort
    echo "-----------------------------------------------------------------"
    envSubst "${NGINX_TMPL}" "${NGINX_CONF}"
    cat "${NGINX_CONF}"
    echo "-----------------------------------------------------------------"
    echo "Proxy API to port: ${API_ENV_PORT}"
    echo "."
  fi

  echo `date +%Y-%m-%d:%H:%M:%S` "Starting nginx ..."
  echo "-----------------------------------------------------------------"
  exec nginx -g 'daemon off;'
  echo "."
}


# Replace all environment variables from template $1
# and output to file $2
function envSubst() {
  local tmpl_file="$1"
  local conf_file="$2"
  compgen -v | while read var ; do
    sed -i "s/\${$var}/$(echo ${!var} | sed -e 's/\\/\\\\/g' -e 's/\//\\\//g' -e 's/&/\\\&/g')/g" "${tmpl_file}"
  done
  cat "${tmpl_file}" > "${conf_file}"
}


[[ $0 != "${BASH_SOURCE}" ]] || main "$@"
