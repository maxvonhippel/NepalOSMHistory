// this script updates the various stats cards on the page
// in accordance with the changes in bounding box, date range,
// and other filters selected in the GUI

function updateCardsRange(start, end) {
	// update the selection statistics box
	var months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	document.getElementById("startDate").innerHTML = start.getUTCDay() + " " + months[start.getUTCMonth()] + " " + start.getUTCFullYear();
	document.getElementById("endDate").innerHTML = end.getUTCDay() + " " + months[end.getUTCMonth()] + " " + end.getUTCFullYear();
}

function updateNepalStatistics(tables){
	$("#nepalMappers").html(tables["Nepal Statistics"].Mappers);
	$("#nepalBuildings").html(tables["Nepal Statistics"].Buildings);
	$("#nepalRoads").html(tables["Nepal Statistics"].Roads);
	$("#nepalSchools").html(tables["Nepal Statistics"].Schools);
	$("#nepalHospitals").html(tables["Nepal Statistics"].Hospitals);
}

function updateSelectedStatistics(tables){
	$("#selectedBuildings_start").html(tables["Selection Statistics"].Buildings_start);
	$("#selectedBuildings_end").html(tables["Selection Statistics"].Buildings_end);
	$("#selectedRoads_start").html(tables["Selection Statistics"].Roads_start);
	$("#selectedRoads_end").html(tables["Selection Statistics"].Roads_end);
	$("#selectedSchools_start").html(tables["Selection Statistics"].Schools_start);
	$("#selectedSchools_end").html(tables["Selection Statistics"].Schools_end);
	$("#selectedHospitals_start").html(tables["Selection Statistics"].Hospitals_start);
	$("#selectedHospitals_end").html(tables["Selection Statistics"].Hospitals_end);
}

function updateNodes(tables){
	$("#tblNodes > tbody").empty();
	for (row in tables.Nodes){
		$("#tblNodes tbody").append('<tr><td class="center">'+tables.Nodes[row]["Rank"]+'</td><td class="center">'+tables.Nodes[row]["OSM Username"]+'</td>	<td class="center">'+tables.Nodes[row]["Nodes"]+'</td><td class="center">'+tables.Nodes[row]["Most Frequently edited POI"]+'</td></tr>');
		
		if(tables.Nodes[row].hasOwnProperty('highlight')){
			$("#tblNodes tr td:contains("+tables.Nodes[row]["OSM Username"]+")").each(function(){$(this).parent().children().addClass('w3-blue highlighted')});
		}
	}
}	

function updateWays(tables){
	alert("hello");
	$("#tblWays > tbody").empty();
	for (row in tables.Ways){
		$("#tblWays tbody").append('<tr><td class="center">'+tables.Ways[row]["Rank"]+'</td><td class="center">'+tables.Ways[row]["OSM Username"]+'</td>	<td class="center">'+tables.Ways[row]["Ways"]+'</td><td class="center">'+tables.Ways[row]["Most Frequently edited POI"]+'</td></tr>');
		
		if(tables.Ways[row].hasOwnProperty('highlight')){
			$("#tblWays tr td:contains("+tables.Ways[row]["OSM Username"]+")").each(function(){$(this).parent().children().addClass('w3-blue highlighted')});
		}
	}
}


