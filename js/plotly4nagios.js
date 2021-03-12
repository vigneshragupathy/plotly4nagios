var LocString = String(window.document.location.href);

function GetQueryString(str) {
  var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(LocString),
    tmp;
  if (tmp = rs) return tmp[2];
  return "";
}

function clear_div(div) {
  var div_2_clear = document.getElementById(div);
  while (div_2_clear.firstChild) {
    div_2_clear.removeChild(div_2_clear.firstChild);
  }
}

function show_loading_img(id) {
  var img = document.createElement("img");
  img.src = "img/loading.gif";
  var src = document.getElementById(id);
  src.appendChild(img);
  document.getElementById(id).setAttribute("align", "center");
}

function hide_loading_img(id) {
  //var img = document.getElementById("img");
  //var src = document.getElementById(id);
  //console.log(src.childNodes)
  //src.removeChild(img);
  var img = document.getElementById(id).lastChild;

  document.getElementById(id).removeChild(img);


}


var url = "https://nagiospreprod.statebanktimes.in/pnp4nagios/xport/csv?host=" + GetQueryString("host") + "&srv=" + GetQueryString("srv") + "&start=" + GetQueryString("start") + "&end=" + GetQueryString("end") + "&view=" + GetQueryString("view");
var url = "https://raw.githubusercontent.com/vignesh88/plotly4nagios/main/nagios.csv"
console.log(url);
urlx = window.location.pathname + "?host=" + GetQueryString("host") + "&srv=" + GetQueryString("srv");
//Plotly.d3.dsv(';')("https://raw.githubusercontent.com/vignesh88/plotly4nagios/main/nagios.csv", function (err, rows) {
//Plotly.d3.dsv(';')("https://nagiospreprod.statebanktimes.in/pnp4nagios/xport/csv?host=R0ETADVOPSAP001&srv=CPU%20Load", function (err, rows) {
function generate_graph(url) {
  //clear_div('DIV_allinone');
  //clear_div('DIV_per_metrics');
  //show_loading_img('DIV_allinone');
  //show_loading_img('DIV_per_metrics');
  $('#loading').show();


  Plotly.d3.dsv(';')(url, function (err, rows) {

    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }


    var monitor_parameters = Object.keys(rows[0]);
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
    //hide_loading_img('DIV_allinone')
    //hide_loading_img('DIV_per_metrics')
    $('#loading').hide();
    Plotly.newPlot('DIV_allinone', data_all, layout_allinone);
    Plotly.newPlot('DIV_per_metrics', data_per_metics, layout_per_metrics);
  })
}
generate_graph(url);