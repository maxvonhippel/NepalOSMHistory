// initialize google charts and vars
google.charts.load('current', {'packages':['annotationchart']});
google.charts.setOnLoadCallback(init);
var name = "data/newedit.csv";
var div = "chart";
var chart, data;
var self = this;

// inactivity listener for event end detection
// len in milliseconds, func is a pointer to what should be done upon completion
var itimer = function(len, func) {
	this.len = len;
	this.func = func;
	this.timer = null;
};

itimer.prototype.start = function() {
	if (this.timer != null)
		clearTimeout(this.timer);
	this.timer = setTimeout(this.func, this.len);
};

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

// used to initialize the map
function init() {
	// we asynchronously load the csv
	// I use jQuery instead of httpxml lik in jsconclustermap because I want to use the csv function
	// same performance basically, maybe a tiny bit slower
	jQuery.ajax({
		// initialize the ajax request
		url: name,
		async: true,
		success: function(csvd) {
			// on success wait until DOM is ready
			$(document).ready(function(){
				// initialize the DOM data array with csv parising
				cdata = $.csv.toArrays(csvd, {onParseValue: $.csv.hooks.castToScalar});
				for (var i = 1; i < cdata.length; i++) {
					// arrange by datestamp
					var parts = (cdata[i][0].split(" ")[0]).match(/(\d+)/g);
					cdata[i][0] = new Date(parts[0], parts[1]-1, parts[2]);

				}

				data = new google.visualization.arrayToDataTable(cdata);
				chart = new google.visualization.AnnotationChart(document.getElementById(div));
				google.visualization.events.addListener(chart, 'rangechange', waitReady);

				function drawchart() {
					var options = {
						displayAnnotations: false,
						displayZoomButtons: false,
						// colors: ['#BBE876', '#A871E8', '#FF8F48'] // uncomment to customize colors used in chart
					};
					chart.draw(data, options);
				}

				drawchart();

				var gStartTime = null;
				var gEndTime = null;

				function selection_change() {

					//request data from the server with new [gStartTime] and [gEndTime]
					request_for_data();
					// showRange is a function in jsonclustermap.js
					self.showRange(gStartTime, gEndTime);
					// update the selection statistics box
					self.updateCardsRange(gStartTime, gEndTime);

				}

				var restim = new itimer(150, drawchart);
				var chartim = new itimer(700, selection_change);

				// create trigger to resizeEnd event
				$(window).resize(function() {
				    if(this.resizeTO) clearTimeout(this.resizeTO);
				    this.resizeTO = setTimeout(function() {
				        $(this).trigger('resizeEnd');
				    }, 500);
				});

				//redraw graph when window resize is completed
				$(window).on('resizeEnd', function() {
				    restim.start();
				});

				// called on range change
				function waitReady(e) {

					// create a one-time listener for when the chart is ready
					gStartTime = e['start'];
					gEndTime = e['end'];
					// avoid the bug on extreme zoom where start >= end
					if (gEndTime.getTime() <= gStartTime.getTime())
						gEndTime = gStartTime.addDays(1);
					chartim.start();

				}

			});
		},
		dataType: "text",
		error: function (request, status, error) {
			alert("failed to load data to timeline chart - ajax error");
	    	}
	});

}