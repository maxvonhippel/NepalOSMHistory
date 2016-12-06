// this script updates the various stats cards on the page
// in accordance with the changes in bounding box, date range,
// and other filters selected in the GUI

// use class="w3-teal highlighted" to highlight user in list

function updateCardsRange(start, end) {
	// update the selection statistics box
	var months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	dstart = new Date(start);
	dend = new Date(end);
	document.getElementById("startDate").innerHTML = dstart.getDate() + " " + months[dstart.getMonth()] + " " + dstart.getFullYear();
	document.getElementById("endDate").innerHTML = dend.getDate() + " " + months[dend.getMonth()] + " " + dend.getFullYear();

}

function updateNepalStatistics(cStats){
	$("#nepalMappers").html(numberWithCommas(cStats.Mappers));
	$("#nepalBuildings").html(numberWithCommas(cStats.Buildings));
	$("#nepalRoads").html(numberWithCommas(cStats.Roads));
	$("#nepalEducation").html(numberWithCommas(cStats.Education));
	$("#nepalHealth").html(numberWithCommas(cStats.Health));
}

function updateSelectionStatistics(sStats){
	$("#selectedBuildings_start").html(numberWithCommas(sStats.Buildings_start));
	$("#selectedBuildings_end").html(numberWithCommas(sStats.Buildings_end));
	$("#selectedRoads_start").html(numberWithCommas(sStats.Roads_start));
	$("#selectedRoads_end").html(numberWithCommas(sStats.Roads_end));
	$("#selectedEducation_start").html(numberWithCommas(sStats.Education_start));
	$("#selectedEducation_end").html(numberWithCommas(sStats.Education_end));
	$("#selectedHealth_start").html(numberWithCommas(sStats.Health_start));
	$("#selectedHealth_end").html(numberWithCommas(sStats.Health_end));

	//Update [current OSM username], [gStartTime] and [gEndTime] below the Selection Statistics Table as well:
	$("#sel_stat_startDate").html(gStartTime);
	$("#sel_stat_endDate").html(gEndTime);
	if (gUsername==""){
		$("#sel_stat_name").html("all OSM Users");
	}
	if(gUsername!=""){
		$("#sel_stat_name").html("OSM user "+gUsername);

	}


}

function updateNodesOld(tables){
	$("#tblNodes > tbody").empty();
	for (row in tables.Nodes){
		$("#tblNodes tbody").append('<tr><td class="center">'+tables.Nodes[row]["Rank"]+'</td><td class="center">'+tables.Nodes[row]["OSM Username"]+'</td>	<td class="center">'+numberWithCommas(tables.Nodes[row]["Nodes"])+'</td><td class="center">'+tables.Nodes[row]["Most Frequently edited POI"]+'</td></tr>');

		if(tables.Nodes[row].hasOwnProperty('highlight')){
			$("#tblNodes tr td:contains("+tables.Nodes[row]["OSM Username"]+")").each(function(){$(this).parent().children().addClass('w3-teal highlighted')});
		}
	}
}

function updateNodes(nodesTable){
	$("#tblNodes > tbody").empty();
	for (row in nodesTable){
		$("#tblNodes tbody").append('<tr><td class="center">'+nodesTable[row]["Rank"]+'</td><td class="center">'+nodesTable[row]["OSM Username"]+'</td>	<td class="center">'+numberWithCommas(nodesTable[row]["Nodes"])+'</td><td class="center">'+nodesTable[row]["Most Frequently edited POI"]+'</td></tr>');

		if(nodesTable[row].hasOwnProperty('highlight')){
			$("#tblNodes tr td:contains("+nodesTable[row]["OSM Username"]+")").each(function(){$(this).parent().children().addClass('w3-teal highlighted')});
		}
	}
}

function updateWays(waysTable){
	$("#tblWays > tbody").empty();
	for (row in waysTable){
		$("#tblWays tbody").append('<tr><td class="center">'+waysTable[row]["Rank"]+'</td><td class="center">'+waysTable[row]["OSM Username"]+'</td>	<td class="center">'+numberWithCommas(waysTable[row]["Ways"])+'</td><td class="center">'+waysTable[row]["Most Frequently edited POI"]+'</td></tr>');

		if(waysTable[row].hasOwnProperty('highlight')){
			$("#tblWays tr td:contains("+waysTable[row]["OSM Username"]+")").each(function(){$(this).parent().children().addClass('w3-teal highlighted')});
		}
	}
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


