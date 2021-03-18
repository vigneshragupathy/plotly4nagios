function readJSON() {
  $.getJSON("../config.json", function (json) {
    console.log(json);
    window.url = json.url_local;
    window.plot_bgcolor_all = json.plot_bgcolor_all;
    window.paper_bgcolor_all = json.paper_bgcolor_all;
    window.layout_allinone_font_color = json.layout_allinone_font_color;
    window.url_dynamic_full = json.url_dynamic + GetQueryString("host") + "&srv=" + GetQueryString("srv") + "&start=" + GetQueryString("start") + "&end=" + GetQueryString("end") + "&view=" + GetQueryString("view");
    window.url_dynamic = json.url_dynamic;
  });
}
readJSON();

var LocString = String(window.document.location.href);


$(function () {

  var start = moment().subtract(1, 'days');
  var end = moment();

  function cb(start, end) {
    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    console.log(start.format('YYYY-MM-DD'));
    console.log(GetQueryString("host"));
    if (start.format('X') == moment().subtract(1, 'days').format('X')) {
      console.log(start.format('X'))
    } else {
      console.log('secondtime')
      url =
        url_dynamic + GetQueryString("host") + "&srv=" + GetQueryString("srv") + "&start=" + start.format(
          'YYYY-MM-DD H:mm') + "&end=" + end.format('YYYY-MM-DD H:mm') + "&view=" + GetQueryString(
          "view");
      generate_graph(url);
    }
  }

  $('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
        'month').endOf('month')]
    }
  }, cb);

  cb(start, end);

});

//var testvalue = readJSON();
//console.log(testvalue.url);

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


function loadXML() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parseXML(this);
    }
  };
  xhttp.open("GET", "../Network_usage.xml", true);
  xhttp.send();
}

function parseXML(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("DATASOURCE");
  //for (i = 0; i < x.length; i++) {
  var Unit = x[0].getElementsByTagName("UNIT")[0].childNodes[0].nodeValue;
  //var Name =  x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
  //}
  //document.getElementById("demo").innerHTML = table;
  generate_graph(url, Unit);
}

urlx = window.location.pathname + "?host=" + GetQueryString("host") + "&srv=" + GetQueryString("srv");

function generate_graph(url, Unit) {
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
          fill: 'tozeroy',
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
            fill: 'tonexty',
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
            fill: 'tonexty',
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
    console.log(Unit);

    var layout_allinone = {
      title: 'Nagios - All in one Graph',
      plot_bgcolor: plot_bgcolor_all,
      paper_bgcolor: paper_bgcolor_all,
      font: {

        color: layout_allinone_font_color
      },
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: "Unit =" + Unit
      },

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
      },
      yaxis: {
        title: "Unit =" + Unit
      },

    };
    var config = {

      displaylogo: false,
      responsive: true,


    };


    $('#loading').hide();
    Plotly.newPlot('DIV_allinone', data_all, layout_allinone, config);
    Plotly.newPlot('DIV_per_metrics', data_per_metics, layout_per_metrics, config);
  })
}
loadXML();



$(document).ready(function () {
  //anything in here will only be called/work when the document is ready.
  console.log(url);
  generate_graph(url);
  //call your function in here, instead of bodyonload
});