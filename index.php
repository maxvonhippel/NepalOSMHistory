<!DOCTYPE html>
<head>
	<!---- jquery --->
	<script src="js/jquery-3.1.1.min.js"></script>
	<script src="js/jquery.csv.js"></script>
	<script src="js/jquery.csv.min.js"></script>
	<!--- google charts --->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<!---- css ---->
	<link href="http://www.w3schools.com/lib/w3.css" rel="stylesheet"/>
	<link href="css/styles.css" rel="stylesheet"/>
	<!---- src ---->
	<script src="js/script.js"></script>
	<!--Leaflet-->
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>
	<script src="js/BoundaryCanvas.js"></script>
	<script src="data/nepal-border.js"></script>
	<!--- prune cluseter --->
	<script src="plugins/PruneCluster/dist/PruneCluster.js"></script>
	<!--LeafletSlider-->
	<!---
	<script src="plugins/leafletSlider/SliderControl.js"></script>
	<script src="plugins/leafletSlider/jquery-1.9.1.min.js"></script>
	<script src="plugins/leafletSlider/jquery-ui.js"></script>
	<link rel="stylesheet" href="plugins/leafletSlider/jquery-ui.css" />
	<script src="plugins/leafletSlider/epoch.json"></script>--->
	<!--fa icons-->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
	
	
</head>

<body>
	<h1 class="pageTitle" id="pageTitle">OpenStreetMap Nepal Statistics</h1>
	<div class="w3-row w3-center">
		
		<div id="#mapchartbox" class="w3-border w3-col l9 s12 w3-sand w3-display-container">
			<div id="mapid" class="w3-border w3-col l9 s12 w3-sand"></div>
			<script type="text/javascript" src="js/jsonclustermap.js"></script>
			<!--- start of chart --->
			<div id="chart" class="w3-border w3-col l9 s12 w3-sand"></div>
			<script type="text/javascript" src="js/mapcontrolchart.js"></script>
			<!--- end of chart --->
		</div>
		<!--- end of map --->
		
		
		<div class="w3-col l3 s12 w3-light-grey w3-center">			
			<div id="nepalStatistics" class="w3-container w3-light-grey">
				<p class="w3-tooltip">Nepal Statistics <i class="fa fa-info-circle" style="font-size:18px;color:#2196f3"><span style="position:relative;bottom:20px;height:30px;width:40px" class="w3-text w3-card-4 w3-animate-opacity w3-yellow tooltip">Shows the cumulative statistics of the entire Nepal</span></i><p>
				<table class="w3-table-all w3-card-4" align="center">
					<tr>
						<th>Features</th>
						<th>Count</th>
					</tr>
					<tr>
						<td>Mappers</td>
						<td class="right">1,920</td>
						
					</tr>
					<tr>
						<td>Buildings</td>
						
						<td class="right">600,000</td>
					</tr>
					<tr>
						<td>Roads (in km)</td>
						<td class="right">94,000</td>
					</tr>
					<tr>
						<td>Schools</td>
						<td class="right">3,216</td>
					</tr>
					<tr>
						<td>Hospitals</td>
						<td class="right">1,012</td>
					</tr>
				</table>				
			</div>
			<div id="selectionStatistics" class="w3-container w3-sand"><p>Selection Statistics</p>
				<!--<img src="img/img_fjords.jpg" class="w3-border w3-padding-4 w3-padding-tiny" alt="Norway" style="width:100%">-->
				<table class="w3-table-all w3-card-4" align="center">
					<tr>
						<th>Features</th>
						<th id="startDate">Dec 2008</th>
						<th id="endDate">Oct 2016</th>
					</tr>
					<!--<tr>
						<td>Mappers</td>
						<td class="right">9</td>
						<td class="right">1,920</td>
						
					</tr>-->
					<tr>
						<td>Buildings</td>
						<td class="right">2,114</td>
						<td class="right">600,000</td>
					</tr>
					<tr>
						<td>Roads (in km)</td>
						<td class="right">1,517</td>
						<td class="right">94,000</td>
					</tr>
					<tr>
						<td>Schools</td>
						<td class="right">53</td>
						<td class="right">3,216</td>
					</tr>
					<tr>
						<td>Hospitals</td>
						<td class="right">23</td>
						<td class="right">1,012</td>
					</tr>
				</table>
			</div>				
		</div>
	</div>
	
	
	<h2 class="sectionTitle">OpenStreetMap Nepal Leaderboards</h2>
	<div class="w3-container w3-row w3-center">
		<div class="w3-col l6 s12 w3-display-container" style="height:265px"><p>Nodes</p>
			<table class="w3-table-all w3-card-4 w3-col l11 s12 w3-display-middle"><!--Nodes Table-->
				<tr>
					<th>Rank</th>
					<th>OSM Username</th>
					<th>Nodes</th>
					<th>Most Frequently edited POI</th>
				</tr>
				<tr>
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
				<tr class="w3-blue highlighted">
					<td class="center">3</td>
					<td class="center">Sazal(Solaris)</td>
					<td class="center">10,18,216</td>
					<td class="center">Airport</td>
				</tr>
			</table>
		</div>
		<div class="w3-col l6 s12 w3-display-container" style="height:265px"><p>Ways</p>
			<table class="w3-table-all w3-card-4 w3-col l11 s12 w3-display-middle"><!--Ways Table-->
				<tr>
					<th>Rank</th>
					<th>OSM Username</th>
					<th>Ways</th>
					<th>Most Frequently edited POI</th>
				</tr>
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
			</table>
		</div>
		
	</div>
	<br/><br/>
</body>


</html>

