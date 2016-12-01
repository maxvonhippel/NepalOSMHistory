// initialize google charts and vars
google.charts.load('current', {'packages':['annotationchart']});
google.charts.setOnLoadCallback(init);
var div = "chart";
var chart, data;
cdl = 3600;
var cdata = new Array(cdl); // will work for at least 80 years more before it nees to be updated
var ic = 0;
while ( ic < cdl ) { cdata[ic] =0; ic++; }
var self = this;
var cstep = 1;
cdata[0] = [ {label: 'timestamp', id: 'timestamp', type: 'datetime'},
         {label: 'New Features', id: 'New Features', type: 'number'},
         {label: 'Edits', id: 'Edits', type: 'number'} ];

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

// -------------------------- CSV PARSING FOR THE MAP ----------------------------------
function init() {
	Papa.parse("http://localhost:8888/NepalOSMHistory/data/sampledaily/activity.csv", {
		download: true, 		// downloads the file, otherwise it doesn't work
		dynamicTyping: true, 	// automatically figures out if something is a string, number, etc
		delimiter: ",", 		// explicit statement improves speed
		step: function(row) {
			parseday(row.data[0]);		// parse row by row for speed
		},
		complete: function() {
			console.log("All done!");
			doneload();
		}
	});
}

// this function parses our response once we get it (see code above in fillmap() )
function parseday(c) {
	try {
		cdata[cstep] = [];
		cdata[cstep] = [ new Date(c[0].toString()), c[1], c[2] ];
		cstep += 1;
	} catch (err) {
		console.log("error with map chart data parse: " + err + " from line " + c.toString());
	}

}

function doneload() {
	try {
		cdata.length = cstep;
		data = new google.visualization.arrayToDataTable(cdata);
		chart = new google.visualization.AnnotationChart(document.getElementById(div));
		google.visualization.events.addListener(chart, 'rangechange', waitReady);
		drawchart();
	} catch (err) {
		console.log("doneload() didn't work: " + err)
	} finally {
		var restim = new itimer(150, drawchart);
		var chartim = new itimer(700, selection_change);
		// create trigger to resizeEnd event
		$(window).resize(function() {
			if(this.resizeTO) clearTimeout(this.resizeTO);
			this.resizeTO = setTimeout(function() { $(this).trigger('resizeEnd'); }, 500);
		});
		//redraw graph when window resize is completed
		$(window).on('resizeEnd', function() { restim.start(); });
	}

}

function drawchart() {
	var options = {
		displayAnnotations: false,
		displayZoomButtons: false,
		colors: ['#15A6B7', '#fc721b', '#FF8F48'] // uncomment to customize colors used in chart
	};
	chart.draw(data, options);
}

function selection_change() {

	//request data from the server with new [gStartTime] and [gEndTime]
	if (gStartTime != null && gEndTime != null) {
		request_for_data();
		self.date_range_change(gStartTime, gEndTime);
	}

}

// called on range change
function waitReady(e) {
	if (e['start'] && e['end']) {
		// create a one-time listener for when the chart is ready
		gStartTime = e['start'];
		gEndTime = e['end'];
		// avoid the bug on extreme zoom where start >= end
		if (gEndTime.getDate() <= gStartTime.getDate())
			EndTime = gStartTime.addDays(1);
		chartim.start();
	}
}