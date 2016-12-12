// dychart: http://dygraphs.com/options.html
// range slider: https://refreshless.com/nouislider/slider-values/
// on off swtich: https://proto.io/freebies/onoff/

var gStartTime = new Date(2008-01-01);
var gEndTime = new Date();
var elem;
var FULLVERSION = true;
var dchart;

var div = "chart";
var chart, data;
var self = this;
var file = "data/sampledaily/activity.csv";

function getConfirmation() {

    var retVal = confirm("Would you like to load the full version of the website?  This could take 3 to 10 minutes, on a standard Nepali internet connection.");
    FULLVERSION = retVal;
    // TODO: if cancel, switch the ui switch back to lite!
	var slider = document.getElementById('slider');
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
            rangeSelectorHeight: 30,
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
  			}

        }
    );

}

function initslider() {
	// what is the slider start?
	var start = FULLVERSION ? [ gStartTime, gEndTime ] : new Date((gStartTime.getTime() + gEndTime.getTime()) / 2);
	// initialize the slider
	var slider = document.getElementById('slider');
	noUiSlider.create(slider, {
		start: start,
		range: {
			'min': [  gStartTime ],
			'max': [ gEndTime ]
		}
	});
	// add listener
	slider.noUiSlider.on('change', function(){
		// what is the new selection?
		var select = slider.noUiSlider.get();
		try {
			gStartTime = select[0];
			gEndTime = select[1];
			// if we make it this far it's a range
			self.date_range_change(gStartTime, gEndTime);
		} catch (err) {
			gStartTime = select;
			// if we make it to here it's a single date
			self.date_range_change(gStartTime, null);
		}
	});
}


$(document).ready(function () {
	// get the country statistics so we can start filling in the cards
    country_stats();
    // populate the chart
    popupate_chart();
    // initialize the range slider
	initslider();
	// add a listener to the switch to switch to full mode
	document.getElementById("myonoffswitch").addEventListener("click", getConfirmation);
	// start filling the map
	FULLVERSION = false;
    fillmap_lite();
    // trigger any other cards to update based on the time range
	self.date_range_change(gStartTime, gEndTime);
	// find the progress bar so we can increment it
	elem = document.getElementById("myBar");
});