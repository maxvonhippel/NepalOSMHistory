// initialize google charts and vars
google.charts.load('current', {'packages':['annotationchart']});
google.charts.setOnLoadCallback(init);
var name = "data/newedit.csv";
var div = "chart";
var chart, data;
var self = this;

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
				var options = {
					displayAnnotations: false,
					displayZoomButtons: false,
					//colors: ['#15a6b7', '#FF8F48', '#FF8F48'] // uncomment to customize colors used in chart
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
				
				// called on range change
				function waitReady(e) {
					// create a one-time listener for when the chart is ready
					google.visualization.events.addOneTimeListener(chart, 'ready', function() {
						//set the global variables [gStartTime] and [gEndTime] here:
						gStartTime=e['start'];
						gEndTime=e['end'];
						//request data from the server with new [gStartTime] and [gEndTime]
						request_for_data();
						
						// showRange is a function in jsonclustermap.js
						self.showRange(e['start'], e['end']);
						// update the selection statistics box
						self.updateCardsRange(e['start'], e['end']);
						
					});
				}
				
			});
		},
		dataType: "text",
		error: function (request, status, error) {
			alert("failed to load data to timeline chart - ajax error");
	    	}
	});

}