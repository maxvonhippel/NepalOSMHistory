#Readme for Nepal OSM History Visualizer

The **Nepal OSM History Visualizer** is a project by Kathmandu Living Labs and the Dartmouth Dickey Center.  It was built by Sazal and Max, and designed by Paras and Sazal.

![](documentation/nepalstatskllosm.png)

This project is an attempt to replicate the features of the [OpenStreetMaps Analytics Tool](http://osm-analytics.org) (OSMA).  The primary difference is that we are incorporating full edit history, meaning that our database and our metadata (charts, graphs, statistics, etc.) take into account every single edit ever done to every single feature, even if that edit is not currently visible.  OSMA does not do this, and they acknowledge it as a major limitation in their [README](https://github.com/hotosm/osm-analytics).

###Dependencies, Build, Install Instructions, etc.

... can be found in the [Wiki](https://github.com/maxvonhippel/NepalOSMHistory/wiki).  Note that this project uses the [OSMHistoryServer](https://github.com/maxvonhippel/OSMHistoryServer) as a submodule, so unless you want to build your own server that employs the same API as ours, you should check out the [Server wiki](https://github.com/maxvonhippel/OSMHistoryServer/wiki) for the dependencies, build and install instructions, etc. involved on that end.

###TODO

1. Google Charts is too slow right now.  It either needs to be optimized for at minimum 50% speed increase, or replaced with an alternative such as [D3.JS](http://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172) (I can't get this to not look like garbage when squeezed to be less tall, maybe worth giving another shot later on) or [Dygraphs](http://dygraphs.com/tests/range-selector.html) (see [article relating to Dygraphs and R](https://rstudio.github.io/dygraphs/gallery-range-selector.html)).
2. `cards.js` needs to send queries to GeoDjango server per Sazal's API, get the response, and update accordingly per user selections.
2. `fillmap.js` needs user and place search.


###Other Important Stuff To Know

You can reach Max on Twitter [`@_m_vh`](https://twitter.com/_m_vh), or Kathmandu Living Labs [`@KTMLivingLabs`](https://twitter.com/KTMLivingLabs).  We accept and welcome pull requests!  But regardless, feel free to fork.  **MIT License with Attribution.**
