<!DOCTYPE html>
<head>
	<!---- jquery --->
	<script src="js/jquery-3.1.1.min.js"></script>
	<script src="js/jquery.csv.js"></script>
	<script src="js/jquery.csv.min.js"></script>
	<!-- For the SearchBox -->
	<link href="css/search.css" rel="stylesheet">
	<script src="server/usernames.js"></script> <!-- List of usernames; updated daily on the server  -->
	<!--fa icons-->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
	<!--- google charts --->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<!---- css ---->
	<link href="http://www.w3schools.com/lib/w3.css" rel="stylesheet"/>
	<link href="css/styles.css" rel="stylesheet"/>
	<!---- src ---->
	<script src="js/script.js"></script>
	<!--Leaflet-->
	<link rel="stylesheet" href="css/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>
	<script src="js/BoundaryCanvas.js"></script>
	<script src="data/nepal-border.js"></script>
	<!--- prune cluster --->
	<script src="plugins/PruneCluster/dist/PruneCluster.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
	<!--- cards updater --->
	<script type="text/javascript" src="js/cards.js"></script>
	<!--- map filler --->
	<script type="text/javascript" src="js/fillmap.js"></script>
	<!-- Leaflet Search -->
	<script src="plugins/leaflet-search/leaflet-search.min.js"></script>
	<script src="plugins/leaflet-search/leaflet-search.src.js"></script>
	<link rel="stylesheet" href="plugins/leaflet-search/leaflet-search.src.css">
	<link rel="stylesheet" href="plugins/leaflet-search/leaflet-search.mobile.src.css">
	<link rel="stylesheet" href="plugins/leaflet-search/leaflet-search.mobile.min.css">
	<link rel="stylesheet" href="plugins/leaflet-search/leaflet-search.min.css"> 
	
</head>

<body>
	<div id="block-everything"  >
		<img id="loading" class="w3-display-middle" align="center" src="resources/loading.gif"/>
	</div> <!-- end of div id="block-everything" -->
	<!-- <div id="glassy-effect"> -->
	<div class="title">
		<h1 id="pageTitle" class="pageTitle">
			<span id="titleOpenStreetMap">OpenStreetMap</span>
			<span id="titleStatisticsTool">Nepal Statistics</span>
		</h1>
	</div>
		
		<div class="w3-row w3-center">
			
			<div id="#mapchartbox" class="w3-border w3-border-blue-grey w3-col l9 s12 w3-display-container">
				<div id="mapid" class="w3-border w3-col l9 s12">
					<!-- For the searchbox -->
					<div id="wrap" class="w3-col l4 s10 w3-display-topright">			
						<input id="searchBox" type="text" onfocus="this.select();" onkeyup="matched(this.value)" placeholder="Search for OSM username..." onfocusout="myfocusout()"/>
						<!--<div id="console" style="visibility:hidden">	
						</div> -->
						<ul id="username" class="w3-ul w3-card-2">	
						</ul>
					</div>
					<!-- End of searchbox -->
				</div>
				<script type="text/javascript" src="js/jsonclustermap.js"></script>
				<!--- start of chart --->
				<div id="chart" class="w3-border w3-col l9 s12"></div>
				<script type="text/javascript" src="js/mapcontrolchart.js"></script>
				
				<!--- end of chart --->
			</div>
			<!--- end of map --->
			
			
			<div class="w3-col l3 s12 w3-light-grey w3-left">			
				<div id="nepalStatistics" class="w3-container">
					<p class="w3-tooltip custom-tooltip">Nepal Statistics 
						<img src="resources/i_icon.png" width="20px"</img>
						<span class="w3-text w3-card-2 w3-animate-opacity w3-light-grey tooltip">
							Shows the cumulative statistics of the entire Nepal
						</span>
					</p>
					
					<table id="tblNepalStatistics" class="w3-table-all w3-card-2" >
						<tr>
							<th class="th_left">Features</th>
							<th class="th_right">Count</th>
						</tr>
						<tr>
							<td>Mappers</td>
							<td id="nepalMappers" class="right">1,920</td>
							
						</tr>
						<tr>
							<td>Buildings</td>
							
							<td id="nepalBuildings" class="right">600,000</td>
						</tr>
						<tr>
							<td>Roads (in km)</td>
							<td id="nepalRoads" class="right">94,000</td>
						</tr>
						<tr>
							<td>Schools</td>
							<td id="nepalSchools" class="right">3,216</td>
						</tr>
						<tr>
							<td>Hospitals</td>
							<td id="nepalHospitals" class="right">1,012</td>
						</tr>
					</table>				
				</div>
				<div id="selectionStatistics" class="w3-container">
					<p class="w3-tooltip custom-tooltip">Selection Statistics 
						<img src="resources/i_icon.png" width="20px"</img>
						<span class="w3-text w3-card-2 w3-animate-opacity w3-light-grey tooltip"> 
							Shows the statisics of the selected user within the selected date range and the selected (zoomed in) area of the map 
						</span>
					</p>
					<table class="w3-table-all w3-card-2" align="center">
						<tr>
							<th class="th_left">Features</th>
							<th id="startDate" class="th_center">18 March 2007</th>
							<th id="endDate" class="th_right">Oct 2016</th>
						</tr>
						<tr>
							<td>Buildings</td>
							<td id="selectedBuildings_start" class="center">2,114</td>
							<td id="selectedBuildings_end" class="right"class="right">600,000</td>
						</tr>
						<tr>
							<td>Roads (in km)</td>
							<td id="selectedRoads_start" class="center">1,517</td>
							<td id="selectedRoads_end" class="right">94,000</td>
						</tr>
						<tr>
							<td>Schools</td>
							<td id="selectedSchools_start" class="center">53</td>
							<td id="selectedSchools_end" class="right">3,216</td>
						</tr>
						<tr>
							<td>Hospitals</td>
							<td id="selectedHospitals_start" class="center">23</td>
							<td id="selectedHospitals_end" class="right">1,012</td>
						</tr>
					</table>
				</div>				
			</div>
		</div>
		
		
		<h2 class="sectionTitle">OpenStreetMap Nepal Leaderboards</h2>
		<div class="w3-container w3-row w3-center">
			<div class="w3-col l6 s12 w3-display-container" style="min-height:auto"><p>Nodes</p>
				<table id="tblNodes" class="w3-table-all w3-card-4 w3-col l11 s12 center"><!--Nodes Table-->
					<thead>
						<tr>
							<th>Rank</th>
							<th>OSM Username</th>
							<th>Nodes</th>
							<th>Most Frequently edited POI</th>
						</tr>
					</thead>
					<tbody>
						<tr class="w3-blue highlighted">
							<td class="center">1</td>
							<td class="center">Nama Budhathoki</td>
							<td class="center">12,14,145</td>
							<td class="center">Restaurant</td>
							
						</tr>
						<tr>
							<td class="center">2</td>
							<td class="center">Pratik Gautam</td>
							<td class="center">10,18,216</td>
							<td class="center">Airport</td>
						</tr>
						<tr>
							<td class="center">3</td>
							<td class="center">Sazal(Solaris)</td>
							<td class="center">10,18,216</td>
							<td class="center">Airport</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="w3-col l6 s12 w3-display-container" style="height:auto"><p>Ways</p>
				<table id= "tblWays" class="w3-table-all w3-card-4 w3-col l11 s12 center"><!--Ways Table-->
					<thead>
						<tr>
							<th>Rank</th>
							<th>OSM Username</th>
							<th>Ways</th>
							<th>Most Frequently edited POI</th>
						</tr>
					</thead>
					<tbody>
						<tr class="w3-blue highlighted">
							<td class="center">1</td>
							<td class="center">Sazal(Solaris)</td>
							<td class="center">10,18,216</td>
							<td class="center">Airport</td>					
						</tr>
						<tr>
							<td class="center">2</td>
							<td class="center">Nama Budhathoki</td>
							<td class="center">12,14,145</td>
							<td class="center">Restaurant</td>					
						</tr>
						<tr>
							<td class="center">3</td>
							<td class="center">Pratik Gautam</td>
							<td class="center">10,18,216</td>
							<td class="center">Airport</td>
							
						</tr>
					</tbody>
				</table>
			</div>
			
		</div>
		<br/><br/>
		<!-- </div> <!-- id "glassy-effect" -->
	</body>
</html>

