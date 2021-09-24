# plotly4nagios

[![My LinkedIn](https://img.shields.io/badge/LinkedIn%20Profile-Vignesh-blue?logo=linkedin)](https://www.linkedin.com/in/vigneshragupathy/)
![GitHub](https://img.shields.io/github/license/vigneshragupathy/plotly4nagios)
[![Build Status](https://travis-ci.com/vigneshragupathy/plotly4nagios.svg?branch=main)](https://travis-ci.com/vigneshragupathy/plotly4nagios)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b5584b07ff944a77a9e1fcd0951c2eb8)](https://app.codacy.com/gh/vigneshragupathy/plotly4nagios?utm_source=github.com&utm_medium=referral&utm_content=vigneshragupathy/plotly4nagios&utm_campaign=Badge_Grade_Settings)
[![CodeFactor](https://www.codefactor.io/repository/github/vigneshragupathy/plotly4nagios/badge)](https://www.codefactor.io/repository/github/vigneshragupathy/plotly4nagios)
[![DeepSource](https://deepsource.io/gh/vigneshragupathy/plotly4nagios.svg/?label=active+issues&show_trend=true)](https://deepsource.io/gh/vigneshragupathy/plotly4nagios/?ref=repository-badge)

Plotly4Nagios is a nagios plugin to display the performance data in Graph. It uses the RRD database provided by pnp4nagios and visualize it in interactive graph format using plotly javascript. You can experiment it and report the issue/feedback for further enhancement.

> Plotly4Nagios is accepted and listed under official [nagios addons](https://exchange.nagios.org/directory/Addons/Graphing-and-Trending/Plotly4Nagios/details)

## Features

- Easy integration with nagios `notes_url`.
- Single page view for all performance metrics.
- Easy template change using configuration variable.
- Docker container based deploy and run.

## Prerequisite

- [pnp4nagios](https://support.nagios.com/kb/article/nagios-core-performance-graphs-using-pnp4nagios-801.html)

## Installation

- Download plotly4nagios.tar.gz and extract it under /usr/local/plotly4nagios
- Modify the config.json variables according to the environment
- Copy the plotly4nagios/plotly4nagios.conf to /etc/http/conf.d/ folder and restart httpd
- Add the follwing with  notes_url to templates.cfg.

``` bash
    notes_url /plotly4nagios/plotly4nagios.html?host=\$HOSTNAME\$&srv=_HOST_
    notes_url /plotly4nagios/plotly4nagios.html?host=\$HOSTNAME$&srv=\$SERVICEDESC$
```

- Restart httpd and nagios.

## Installation with docker(Ubuntu image)

- Build the docker image using the below command

```bash
git clone https://github.com/vigneshragupathy/plotly4nagios.git
cd plotly4nagios
docker build -t plotly4nagios .
```

- Run the docker container using the below command

```bash
docker run -it --name plotly4nagios -p 80:80 plotly4nagios
```

Alternatively direct pull and run from docker hub.

```bash
docker run -d -p 80:80 --name plotly4nagios vigneshragupathy/plotly4nagios
```

> Open from the browser and view the application at http://localhost/nagios

### Login details

- Username : nagiosadmin
- Password : nagios

## Demo

!['demo'](https://raw.githubusercontent.com/vigneshragupathy/plotly4nagios/main/img/plotly4nagios.gif)

## Screenshot

### Dark mode

!['Dark mode'](https://raw.githubusercontent.com/vigneshragupathy/plotly4nagios/main/img/screenshot_darkmode.png)

## License

Copyright 2020-2021 © Vignesh Ragupathy. All rights reserved.

Licensed under the [MIT License](https://github.com/vigneshragupathy/plotly4nagios/blob/ed09f8d687014107c8002d92acbc7acd2f62468a/LICENSE)