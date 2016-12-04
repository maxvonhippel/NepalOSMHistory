// initialize vars
var gStartTime = new Date(0);
var gEndTime = new Date(0);
var div = "chart";
var chart, data;
var self = this;
var file = "http://localhost/NepalOSMHistory/NepalOSMHistory/data/sampledaily/activity.csv";

$(document).ready(function () {
    var dchart = new Dygraph(
        document.getElementById(div),
        file,
        {
            labelsKMG2: true,
			showRoller: true,
            customBars: false,
            legend: 'always',
            labelsDivStyles: { 'textAlign': 'right' },
            showRangeSelector: true,
            rangeSelectorHeight: 30,
            axisLabelFontSize: 11,
            zoomCallback: function(minX, maxX, yRanges) {
				gStartTime.setUTCMilliseconds(minX);
				gEndTime.setUTCMilliseconds(maxX);
				// console.log("start: ", gStartTime.toString(), " end: ", gEndTime.toString());
				date_range_change(gStartTime, gEndTime);
  			}
            // http://dygraphs.com/options.html
        }
    );
});