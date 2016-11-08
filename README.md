#Readme for Nepal OSM History Visualizer

The **Nepal OSM History Visualizer** is a project by Kathmandu Living Labs and the Dartmouth Dickey Center.  It was built by Sazal and Max, and designed by Paras and Sazal.

This project is an attempt to replicate the features of the [OpenStreetMaps Analytics Tool](http://osm-analytics.org) (OSMA).  The primary difference is that we are incorporating full edit history, meaning that our database and our metadata (charts, graphs, statistics, etc.) take into account every single edit ever done to every single feature, even if that edit is not currently visible.  OSMA does not do this, and they acknowledge it as a major limitation in their [README](https://github.com/hotosm/osm-analytics).

To make this work, you're going to need to do a few things.

1.  You need to install MAMP.
2.  When you clone this, clone it in:

	> /Applications/MAMP/htdocs/

	For example,

	> cd /Applications/MAMP/htdocs/
	> 
	> git clone https://github.com/maxvonhippel/NepalOSMHistory.git

3.  You need to make a GEOJSON file with some data in Nepal and name it dirtydata.json, and put it in the data folder in the repository.  We will add code and instructions for database generation, population, querying, etc. soon, and when we do so you will be able to use our toolset to create this file.  For now, if you want to play with this repo, just know that the format of the file looks like this:

```GEOJSON
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
		},
		... etc
		... etc
	]
}

```

You can reach Max on Twitter [`@_m_vh`](https://twitter.com/_m_vh), or Kathmandu Living Labs [`@KTMLivingLabs`](https://twitter.com/KTMLivingLabs).  Feel free to fork.  **MIT License with Attribution.**