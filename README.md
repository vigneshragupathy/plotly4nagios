# plotly4nagios

![GitHub](https://img.shields.io/github/license/vignesh88/plotly4nagios)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b5584b07ff944a77a9e1fcd0951c2eb8)](https://app.codacy.com/gh/vignesh88/plotly4nagios?utm_source=github.com&utm_medium=referral&utm_content=vignesh88/plotly4nagios&utm_campaign=Badge_Grade_Settings)
[![CodeFactor](https://www.codefactor.io/repository/github/vignesh88/plotly4nagios/badge)](https://www.codefactor.io/repository/github/vignesh88/plotly4nagios)
[![DeepSource](https://deepsource.io/gh/vignesh88/plotly4nagios.svg/?label=active+issues&show_trend=true)](https://deepsource.io/gh/vignesh88/plotly4nagios/?ref=repository-badge)

## Installation

- Install the [pnp4nagios](https://support.nagios.com/kb/article/nagios-core-performance-graphs-using-pnp4nagios-801.html)
- Download plotly4nagios.tar.gz and extract it under /usr/local/plotly4nagios
- Modify the config.json variables according to the environment
- Copy the plotly4nagios/plotly4nagios.conf to /etc/http/conf.d/ folder and restart httpd
- Add Nagios service config with  notes_url.

``` bash
    notes_url /plotly4nagios/plotly4nagios.html?host=$HOSTNAME$&srv=$SERVICEDESC$
```

- Restart httpd and nagios.

## Installation with docker

- build the docker image using the below command

```bash
docker run -dit --name my-running-app -p 8080:80 my-apache2
```

- Run the docker container using the below command

```bash
docker run -dit --name plotly4nagios -p 8000:80 plotly4nagios
```

- Open from the browser and access the URL

```bash
http://localhost:8000/plotly4nagios.html
```

## Screenshot

![Alt text](img/screenshot.png?raw=true "Title")

## License

Copyright 2020-2021 © Vignesh Ragupathy. All rights reserved.

Licensed under the [MIT License](https://github.com/vignesh88/plotly4nagios/blob/ed09f8d687014107c8002d92acbc7acd2f62468a/LICENSE)