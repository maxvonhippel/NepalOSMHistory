<?php
//print "Hello from the server";
//print_r($_POST);

$json='{
	"Nepal Statistics":{
		"Mappers":1920,
		"Buildings":600000,
		"Roads":94000,
		"Schools":3216,
		"Hospitals":1012
	},
	"Selection Statistics":{
		"Buildings_start":1000,
		"Roads_start":1000,
		"Schools_start":1000,
		"Hospitals_start":1000,
		"Buildings_end":2000,
		"Roads_end":2000,
		"Schools_end":2000,
		"Hospitals_end":2000
	},
	"Nodes":{
		"first":{
			"Rank":1,
			"OSM Username":"Nama Budhathoki",
			"Nodes":1214145,
			"Most Frequently edited POI":"Restaurant"
			
		}
		,
		"second":{
			"Rank":2,
			"OSM Username":"Pratik Gautam",
			"Nodes":1018216,
			"Most Frequently edited POI":"Airport"
		}
		,
		"third":{
			"Rank":3,
			"OSM Username":"Sazal(Solaris)",
			"Nodes":1018216,
			"Most Frequently edited POI":"Museum"
		},
		"other":{
			"Rank":255,
			"OSM Username":"Two Fifty Five",
			"Nodes":14216,
			"Most Frequently edited POI":"Two Fifty Diners",
			"highlight":1
		},
		"other2":{
			"Rank":512,
			"OSM Username":"Five Twelve",
			"Nodes":14216,
			"Most Frequently edited POI":"Five Tweleve Eatery"
		}
	},
	"Ways":{
		"first":{
			"Rank":1,
			"OSM Username":"Sazal(Solaris)",
			"Ways":1214145,
			"Most Frequently edited POI":"Museum"
		}
		,
		"second":{
			"Rank":2,
			"OSM Username":"Nama Budhathoki",
			"Ways":1018216,
			"Most Frequently edited POI":"Restaurant"
		}
		,
		"third":{
			"Rank":3,
			"OSM Username":"Pratik Gautam",
			"Ways":1018216,
			"Most Frequently edited POI":"Airport"
		},
		"other":{
			"Rank":255,
			"OSM Username":"Two Fifty Five",
			"Ways":14216,
			"Most Frequently edited POI":"Two Fifty Diners",
			"highlight":1
		},
		"other2":{
			"Rank":512,
			"OSM Username":"Five Twelve",
			"Ways":14216,
			"Most Frequently edited POI":"Five Tweleve Eatery"
		}
	}
	
}';

print($json);

?>