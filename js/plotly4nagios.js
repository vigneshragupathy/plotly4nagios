Plotly.d3.dsv(';')("https://raw.githubusercontent.com/vignesh88/plotly4nagios/main/nagios.csv", function (err, rows) {

  function unpack(rows, key) {
    return rows.map(function (row) {
      return row[key];
    });
  }

  var monitor_parameters = Object.keys(rows[1]);
  var data_final_all = [];
  var data_final_per_metrics = [];
  var j = 1;

  for (var i = 0; i < monitor_parameters.length; i++) {
    console.log('x' + i);
    if (monitor_parameters[i].includes("_AVERAGE")) {
      console.log(monitor_parameters[i]);
      console.log('x' + j);
      var trace_all = {
        type: "scatter",
        mode: "lines+markers",
        name: monitor_parameters[i].replace("_AVERAGE", ""),
        x: unpack(rows, 'timestamp').map(parseTime),
        y: unpack(rows, monitor_parameters[i]),
      };
      data_final_all.push(trace_all);
    }
  }

  for (var i = 0; i < monitor_parameters.length; i++) {
    if (monitor_parameters[i].includes("_AVERAGE")) {
      if (j == 1) {
        var trace_all = {
          type: "scatter",
          mode: "lines+markers",
          name: monitor_parameters[i].replace("_AVERAGE", ""),
          x: unpack(rows, 'timestamp').map(parseTime),
          y: unpack(rows, monitor_parameters[i]),
        };
        j++;
        data_final_per_metrics.push(trace_all);
      } else {
        var trace_all = {
          type: "scatter",
          mode: "lines+markers",
          name: monitor_parameters[i].replace("_AVERAGE", ""),
          x: unpack(rows, 'timestamp').map(parseTime),
          y: unpack(rows, monitor_parameters[i]),
          xaxis: 'x' + j,
          yaxis: 'y' + j,
        };
        j++;
        data_final_per_metrics.push(trace_all);
      }
    }
  }

  var data_all = data_final_all;
  var data_per_metics = data_final_per_metrics;

  var layout_allinone = {
    title: 'Nagios - All in one Graph',
    xaxis: {
      title: 'Date'
    }
  };

  var layout_per_metrics = {
    title: 'Nagios - Per Metrics Graph',
    //xaxis: {
    //   tickformat: "%H:%M" // For more formatting types, see: https://github.com/d3/d3-format/blob/master/README.md#locale_format
    // title: 'Date'
    //},
    grid: {
      rows: 3,
      columns: 3,
      pattern: 'independent'
    }
  };

  Plotly.newPlot('DIV_allinone', data_all, layout_allinone);
  Plotly.newPlot('DIV_per_metrics', data_per_metics, layout_per_metrics);
})