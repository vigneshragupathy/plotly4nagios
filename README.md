# plotly4nagios

[![CodeFactor](https://www.codefactor.io/repository/github/vignesh88/plotly4nagios/badge)](https://www.codefactor.io/repository/github/vignesh88/plotly4nagios) [![DeepSource](https://deepsource.io/gh/vignesh88/plotly4nagios.svg/?label=active+issues&show_trend=true)](https://deepsource.io/gh/vignesh88/plotly4nagios/?ref=repository-badge)

## Installation
```
1. Install the pnp4nagios https://support.nagios.com/kb/article/nagios-core-performance-graphs-using-pnp4nagios-801.html
2. Download plotly4nagios.tar.gz and extract it under /usr/local/plotly4nagios
3. Modify the config.json variables according to the environment
3. Copy the plotly4nagios/plotly4nagios.conf to /etc/http/conf.d/ folder and restart httpd
4. Add Nagios service config with  notes_url.
    notes_url /plotly4nagios/plotly4nagios.html?host=$HOSTNAME$&srv=$SERVICEDESC$
4.Restart httpd and nagios.
```

## Screenshot
![Alt text](img/screenshot.png?raw=true "Title")