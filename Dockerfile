FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -y
RUN apt-get install nagios4 nagios-plugins-contrib nagios-nrpe-plugin rrdtool librrds-perl php-gd php-xml wget gcc build-essential -y
RUN a2enmod authz_groupfile auth_digest
COPY plotly4nagios/htdigest.users /etc/nagios4/htdigest.users
COPY plotly4nagios/nagios4-cgi.conf /etc/apache2/conf-enabled/nagios4-cgi.conf

RUN set -eux; \
  mkdir src ; \
  cd src ; \
  wget https://excellmedia.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.26.tar.gz ; \
  tar -xzvf pnp4nagios-0.6.26.tar.gz -C /usr/local/src/ ; \
  cd /usr/local/src/pnp4nagios-0.6.26/ ;\
  ./configure --with-httpd-conf=/etc/apache2/sites-enabled ; \
  make all; \
  make install; \
  make install-webconf; \
  make install-config; \
  make install-init;

COPY plotly4nagios/htpasswd.users /etc/nagios4/htpasswd.users
COPY plotly4nagios/Input.php /usr/local/pnp4nagios/lib/kohana/system/libraries/
COPY plotly4nagios/data.php /usr/local/pnp4nagios/share/application/models/
COPY plotly4nagios/plotly4nagios.conf /etc/apache2/sites-enabled/
COPY plotly4nagios/pnp4nagios.conf /etc/apache2/sites-enabled/
COPY plotly4nagios/cgi.conf /etc/nagios4/
COPY . /usr/local/plotly4nagios/
RUN a2enmod rewrite
RUN a2enmod headers
EXPOSE 80
COPY plotly4nagios/run.sh .
RUN chmod +x run.sh
CMD ["sh", "run.sh"]