Plotly.d3.dsv(';')("https://raw.githubusercontent.com/vignesh88/plotly4nagios/main/nagios.csv", function (err, rows) {

  function unpack(rows, key) {
    return rows.map(function (row) {
      return row[key];
    });
  }

  var columns = Object.keys(rows[1]);
  var data_final = [];

  for (var i = 1; i < columns.length - 3; i++) {
    if (columns[i].includes("_AVERAGE")) {
      console.log(columns[i]);
      var trace_all = {
        type: "scatter",
        mode: "lines+markers",
        name: columns[i].replace("_AVERAGE", ""),
        x: unpack(rows, 'timestamp').map(parseTime),
        y: unpack(rows, columns[i])
        //line: {color: '#17BECF'}
      };
      data_final.push(trace_all);
    }
  }


  var data = data_final;
  //var data = [trace_all];

  var layout = {
    title: 'Basic Time Series',
    xaxis: {
      //   tickformat: "%H:%M" // For more formatting types, see: https://github.com/d3/d3-format/blob/master/README.md#locale_format
      title: 'Date'
    }
  };

  Plotly.newPlot('myDiv', data, layout);
})