// dychart: http://dygraphs.com/options.html
// range slider: https://refreshless.com/nouislider/slider-values/
// on off swtich: https://proto.io/freebies/onoff/

var gStartTime = new Date(2008-01-01);
var gEndTime = new Date();
var FULLVERSION = false;
var bar, prog, dchart, version_switch, chart, data;
var div = "chart";
var self = this;
var click_out_warning = false;
var click_to_see_day_warning = false;
var file = "data/sampledaily/activity.csv";

function getConfirmation() {

	var confirmed = true;
	if (FULLVERSION == false) {

		var retVal = confirm("Would you like to load the full version of the website?  This could take 3 to 10 minutes, on a standard Nepali internet connection.");
		FULLVERSION = retVal;
		if (FULLVERSION == false) {

			// if cancel, switch the ui switch back to lite!
			$("#myonoffswitch").prop("checked", true);
			confirmed = false;

		}

	} else FULLVERSION = false;

	if (confirmed == true) {

		// kill rangeselector object (this is not hcleared by dygraph)
		delete dchart.rangeSelector_;
		// update
		dchart.updateOptions({
			showRangeSelector: FULLVERSION
		});
		// resize so redraw is forced
		var cur_width = $("#chart").width();
		var cur_height = $("#chart").height();
		dchart.resize(10, 10);
		dchart.resize(cur_width, cur_height);

	}
}

function popupate_chart() {

	dchart = new Dygraph(
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
            showRangeSelector: false,
            axisLabelFontSize: 11,
            drawCallback: function() {
	            gStartTime = new Date(dchart.xAxisRange()[0]);
				gEndTime = new Date(dchart.xAxisRange()[1]);
				console.log("initialized chart with start date: ", gStartTime, " end date: ", gEndTime);
				self.date_range_change(gStartTime, gEndTime);
	            done = true;
            },
            zoomCallback: function(minDate, maxDate, yRanges) {
	            if (done == true) {
		            gStartTime = new Date(minDate);
					gEndTime = new Date(maxDate);
					console.log("start date: ", gStartTime, " end date: ", gEndTime);
					self.date_range_change(gStartTime, gEndTime);
					done = false;
	            }
	            if (click_out_warning == false && FULLVERSION == false) {
					click_out_warning = true;
					alert("Double click anywhere on the chart to zoom back out.");
	            }
  			},
  			clickCallback: function(e, x, points) {
  				// are we in lite mode?  if so, populate map accordingly
  				if (FULLVERSION == false) {
	  				if (click_to_see_day_warning == false) {
		  				click_to_see_day_warning = true;
		  				alert("Click a day on the chart to view the data from that day on the map. Click and drag on the chart to zoom in.");
		  				// do we want to tell the user that they can select a range?
	  				}
	  				// the date that was clicked
	  				var clicked_date = new Date(x);
	  				console.log("lite version, clicked on: ", clicked_date);
	  				// update the map accordingly
	  				fillmap_lite(clicked_date);
  				}
        	}
        }
    );

}

$(document).ready(function () {

	// find the progress bar so we can increment it
	bar = document.getElementById("myBar");
	prog = document.getElementById("myProgress");
	// make it invisible
	bar.style.visibility = 'hidden';
	prog.style.visibility = 'hidden';
	// get the country statistics so we can start filling in the cards
    country_stats();
    // populate the chart
    popupate_chart();
	// add a listener to the switch to switch to full mode
	version_switch = document.getElementById("myonoffswitch");
	version_switch.addEventListener("click", getConfirmation);
	// start filling the map
	FULLVERSION = false;
    // trigger any other cards to update based on the time range
	self.date_range_change(gStartTime, gEndTime);

});