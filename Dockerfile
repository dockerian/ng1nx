FROM nginx

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    curl wget jq make nano net-tools openssl tree unzip zip \
 && echo "" >> ~/.bashrc \
 && echo "export PS1='\n\u@\h [\w] \D{%F %T} [\#]:\n\$ '" >> ~/.bashrc \
 && echo "alias ll='ls -al ' " >> ~/.bashrc \
 && echo "" >> ~/.bashrc

COPY ./nginx/entrypoint.sh /etc/nginx/entrypoint.sh
COPY ./nginx/nginx.tmpl.conf /etc/nginx/nginx.tmpl.conf
COPY ./src/* /usr/share/nginx/html/

EXPOSE 80 443

WORKDIR /usr/local/src

# ENTRYPOINT [ "/bin/bash", "-c" ]
# ENTRYPOINT [ "/etc/nginx/entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]
