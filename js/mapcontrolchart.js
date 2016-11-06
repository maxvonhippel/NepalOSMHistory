// google chart

google.charts.load('current', {'packages':['annotationchart']});
google.charts.setOnLoadCallback(init);
//	initialize our data source
function init() { 
	//	populate our google chart with data
	jx("data/newedit.csv", "chart"); 
}
	    
function jx(name, div) {
		    
	jQuery.ajax({
		
		url: name,
		async: false,
		ready: function(csvd) {
			cdata = $.csv.toArrays(csvd, {onParseValue: $.csv.hooks.castToScalar});
			for (var i = 1; i < cdata.length; i++) {
						
				var parts = (cdata[i][0].split(" ")[0]).match(/(\d+)/g);
				cdata[i][0] = new Date(parts[0], parts[1]-1, parts[2]);
						
			}
			var data = new google.visualization.arrayToDataTable(cdata);
			var chart = new google.visualization.AnnotationChart(document.getElementById(div));
			google.visualization.events.addListener(chart, 'rangechange', updateData);
			var options = {
				displayAnnotations: true,
				displayZoomButtons: false
				// colors: ['#BBE876', '#A871E8', '#FF8F48']
    		};
			chart.draw(data, options);

		},
		dataType: "text",
	    error: function (request, status, error) {
			alert("failed");
	    }
	});

}

function updateData(e) {
	// update the map
	showRange(e['start'], e['end']);
}