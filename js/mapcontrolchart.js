// initialize google charts and vars
google.charts.load('current', {'packages':['annotationchart']});
google.charts.setOnLoadCallback(init);
var name = "data/newedit.csv";
var div = "chart";
var chart, data;

// called when range changes in chart
function updateData(e) {
	// showRange is a function in jsonclustermap.js
	showRange(e['start'], e['end']);
	// update the selection statistics box
	updateCardsRange(e['start'], e['end']);
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
				google.visualization.events.addListener(chart, 'rangechange', updateData);
				var options = {
					displayAnnotations: false,
					displayZoomButtons: false,
					// colors: ['#BBE876', '#A871E8', '#FF8F48'] // uncomment to customize colors used in chart
	    			};
				chart.draw(data, options);
				
				//create trigger to resizeEnd event     
				$(window).resize(function() {
				    if(this.resizeTO) clearTimeout(this.resizeTO);
				    this.resizeTO = setTimeout(function() {
				        $(this).trigger('resizeEnd');
				    }, 500);
				});
				
				//redraw graph when window resize is completed  
				$(window).on('resizeEnd', function() {
				    chart.draw(data, options);
				});
			});
		},
		dataType: "text",
		error: function (request, status, error) {
			alert("failed to load data to timeline chart - ajax error");
	    	}
	});

}