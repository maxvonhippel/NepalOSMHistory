### Readme for Nepal OSM History Visualizer

The **Nepal OSM History Visualizer** is a project by Kathmandu Living Labs and the Dartmouth Dickey Center.  It was built by Sazal and Max, and designed by Paras and Sazal.  A functioning, super light-weight demo of just the map and chart functionalities is live [here](http://mxvh.pl/blog%20posts/nepal_demo.html).

![](documentation/nepalstatskllosm.png)

This project is an attempt to replicate the features of the [OpenStreetMaps Analytics Tool](http://osm-analytics.org) (OSMA).  The primary difference is that we are incorporating full edit history, meaning that our database and our metadata (charts, graphs, statistics, etc.) take into account every single edit ever done to every single feature, even if that edit is not currently visible.  OSMA does not do this, and they acknowledge it as a major limitation in their [README](https://github.com/hotosm/osm-analytics).

### Dependencies, Build, Install Instructions, etc.

... can be found in the [Wiki](https://github.com/maxvonhippel/NepalOSMHistory/wiki).  Note that this project uses the [OSMHistoryServer](https://github.com/maxvonhippel/OSMHistoryServer) as a submodule, so unless you want to build your own server that employs the same API as ours, you should check out the [Server wiki](https://github.com/maxvonhippel/OSMHistoryServer/wiki) for the dependencies, build and install instructions, etc. involved on that end.

### Other Important Stuff To Know

You can reach Max on Twitter [`@_m_vh`](https://twitter.com/_m_vh), or Kathmandu Living Labs [`@KTMLivingLabs`](https://twitter.com/KTMLivingLabs).  We accept and welcome pull requests!  But regardless, feel free to fork.  **MIT License with Attribution.**
