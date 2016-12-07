// initialize vars
var gStartTime = new Date(0);
var gEndTime = new Date(0);
var div = "chart";
var chart, data;
var self = this;
var file = "data/sampledaily/activity.csv";

$(document).ready(function () {
	console.log("filling dygraph chart.");
	var done = false;
    var dchart = new Dygraph(
        document.getElementById(div),
        file,
        {

            axisLineColor:'#09b0a5',
            colors:['#15A6B7','#FF7C33'],
            labelsDiv:"dy_legend",
            labelsSeparateLines: true,
            labelsKMG2: true,
			showRoller: false,
            customBars: false,
            legend: 'always',
            labelsDivStyles: { 'textAlign': 'right' },
            showRangeSelector: true,
            rangeSelectorHeight: 30,
            axisLabelFontSize: 11,
            drawCallback: function() {
	            done = true;
            },
            zoomCallback: function(minDate, maxDate, yRanges) {
	            if (done) {
		            gStartTime = new Date(minDate);
					gEndTime = new Date(maxDate);
					self.date_range_change(gStartTime, gEndTime);
					done = false;
	            }
  			}
            // http://dygraphs.com/options.html
        }
    );
});

// start map parsing
startworker();