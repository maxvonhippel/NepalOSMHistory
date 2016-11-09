<?php
/*
{
	"type":"FeatureCollection",
	"features":[
		{
			"type":"Feature",
			"geometry":{
				"type":"Point",
				"coordinates":[85.3019553,27.7257842]
			},
			"properties":{
				"feature_id":31303849,
				"id":4627,
				"version":1,
				"uid":"7094",
				"user":"Eratosthenes",
				"timestamp":"2007-07-05T01:42:23+05:45"
			}
		}
	]
}
*/
if (isset($_POST['json'])) {
	$obj='{"type":"Feature","geometry":{"type":"Point","coordinates":[85.3019553,27.7257842]},"properties":{"feature_id":31303849,"id":4627,"version":1,"uid":"7094","user":"Eratosthenes","timestamp":"2007-07-05T01:42:23+05:45"}}';
	echo $obj;
}
?>