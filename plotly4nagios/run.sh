#For config
sudo sh -c "sed -i 's/process_performance_data=0/process_performance_data=1/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/#host_perfdata_file=/host_perfdata_file=/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^host_perfdata_file=.*/host_perfdata_file=\/usr\/local\/pnp4nagios\/var\/service-perfdata/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^#host_perfdata_file_template=.*/host_perfdata_file_template=DATATYPE::HOSTPERFDATA\\\\tTIMET::\$TIMET\$\\\\tHOSTNAME::\$HOSTNAME\$\\\\tHOSTPERFDATA::\$HOSTPERFDATA\$\\\\tHOSTCHECKCOMMAND::\$HOSTCHECKCOMMAND\$\\\\tHOSTSTATE::\$HOSTSTATE\$\\\\tHOSTSTATETYPE::\$HOSTSTATETYPE\$/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/#host_perfdata_file_mode=/host_perfdata_file_mode=/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^#host_perfdata_file_processing_interval=.*/host_perfdata_file_processing_interval=15/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^#host_perfdata_file_processing_command=.*/host_perfdata_file_processing_command=process-host-perfdata-file-bulk-npcd/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/#service_perfdata_file=/service_perfdata_file=/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^service_perfdata_file=.*/service_perfdata_file=\/usr\/local\/pnp4nagios\/var\/service-perfdata/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^#service_perfdata_file_template=.*/service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\\\\tTIMET::\$TIMET\$\\\\tHOSTNAME::\$HOSTNAME\$\\\\tSERVICEDESC::\$SERVICEDESC\$\\\\tSERVICEPERFDATA::\$SERVICEPERFDATA\$\\\\tSERVICECHECKCOMMAND::\$SERVICECHECKCOMMAND\$\\\\tHOSTSTATE::\$HOSTSTATE\$\\\\tHOSTSTATETYPE::\$HOSTSTATETYPE\$\\\\tSERVICESTATE::\$SERVICESTATE\$\\\\tSERVICESTATETYPE::\$SERVICESTATETYPE\$/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/#service_perfdata_file_mode=/service_perfdata_file_mode=/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^#service_perfdata_file_processing_interval=.*/service_perfdata_file_processing_interval=15/g' /etc/nagios4/nagios.cfg"
sudo sh -c "sed -i 's/^#service_perfdata_file_processing_command=.*/service_perfdata_file_processing_command=process-service-perfdata-file-bulk-npcd/g' /etc/nagios4/nagios.cfg"

#For commands
sudo sh -c "echo '' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo 'define command {' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '    command_name    process-host-perfdata-file-bulk-npcd' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '    command_line    /bin/mv /usr/local/pnp4nagios/var/host-perfdata /usr/local/pnp4nagios/var/spool/host-perfdata.\$TIMET\$' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '    }' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo 'define command {' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '    command_name    process-service-perfdata-file-bulk-npcd' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '    command_line    /bin/mv /usr/local/pnp4nagios/var/service-perfdata /usr/local/pnp4nagios/var/spool/service-perfdata.\$TIMET\$' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '    }' >> /etc/nagios4/objects/commands.cfg"
sudo sh -c "echo '' >> /etc/nagios4/objects/commands.cfg"

#For PNP
sudo sh -c "sed -i 's#^   	AuthUserFile.*#   	AuthUserFile \"/etc/nagios4/htpasswd.users\"#g' /etc/apache2/sites-enabled/pnp4nagios.conf"
mv /usr/local/pnp4nagios/share/install.php /usr/local/pnp4nagios/share/install.php.bkp
sudo sh -c "echo '' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo 'define host {' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   name       host-pnp' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   action_url /pnp4nagios/index.php/graph?host=\$HOSTNAME\$&srv=_HOST_' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   notes_url /plotly4nagios/plotly4nagios.html?host=\$HOSTNAME\$&srv=_HOST_'  >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   register   0' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '}' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo 'define service {' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   name       service-pnp' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   action_url /pnp4nagios/index.php/graph?host=\$HOSTNAME\$&srv=\$SERVICEDESC\$' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   notes_url /plotly4nagios/plotly4nagios.html?host=\$HOSTNAME$&srv=\$SERVICEDESC$'  >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '   register   0' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '}' >> /etc/nagios4/objects/templates.cfg"
sudo sh -c "echo '' >> /etc/nagios4/objects/templates.cfg"

sudo sh -c "sed -i '/name.*generic-host/a\        use                             host-pnp' /etc/nagios4/objects/templates.cfg"
sudo sh -c "sed -i '/name.*generic-service/a\        use                             service-pnp' /etc/nagios4/objects/templates.cfg"
sudo sh -c "sed -i 's/^perfdata_file_processing_interval = 15/perfdata_file_processing_interval = 5/g' /usr/local/pnp4nagios/etc/npcd.cfg"

#For service
nagios4 -d /etc/nagios4/nagios.cfg
/usr/local/pnp4nagios/bin/npcd -d -f /usr/local/pnp4nagios/etc/npcd.cfg
apachectl -D FOREGROUND