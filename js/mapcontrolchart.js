// dychart: http://dygraphs.com/options.html
// range slider: https://refreshless.com/nouislider/slider-values/
// on off swtich: https://proto.io/freebies/onoff/

var gStartTime = new Date(2008-01-01);
var gEndTime = new Date();
var elem;
var FULLVERSION = false;
var dchart;

var div = "chart";
var chart, data;
var self = this;
var file = "data/sampledaily/activity.csv";

function getConfirmation() {
	if (!FULLVERSION) {
		var retVal = confirm("Would you like to load the full version of the website?  This could take 3 to 10 minutes, on a standard Nepali internet connection.");
		FULLVERSION = retVal;
		if (!FULLVERSION) {
			// TODO: if cancel, switch the ui switch back to lite!
		}

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
            showRangeSelector: true,
            axisLabelFontSize: 11,
            drawCallback: function() {
	            done = true;
            },
            zoomCallback: function(minDate, maxDate, yRanges) {
	            if (done) {
		            gStartTime = new Date(minDate);
					gEndTime = new Date(maxDate);
					console.log("start date: ", gStartTime, " end date: ", gEndTime);
					self.date_range_change(gStartTime, gEndTime);
					done = false;
	            }
  			},
  			annotationClickHandler: function(annotation, point, dg, event) {
  				// are we in lite mode?  if so, populate map accordingly
  				if (!FULLVERSION) {
	  				console.log("clicked on: ", new Date(ann.x));
  					self.fillmap_lite(ann.x.toString());
  				}
        	}
        }
    );

}

$(document).ready(function () {

	// find the progress bar so we can increment it
	elem = document.getElementById("myBar");
	// get the country statistics so we can start filling in the cards
    country_stats();
    // populate the chart
    popupate_chart();
	// add a listener to the switch to switch to full mode
	document.getElementById("myonoffswitch").addEventListener("click", getConfirmation);
	// start filling the map
	FULLVERSION = false;
    // trigger any other cards to update based on the time range
	self.date_range_change(gStartTime, gEndTime);

});