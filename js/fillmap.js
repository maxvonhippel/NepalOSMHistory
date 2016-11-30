Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var width = 1;
var hundredth = 200000;

function move() {
	var elem = document.getElementById("myBar");
	if (width >= 100) {
		width = 1;
		elem.style.width = width + '%';
	} else {
		width++;
		elem.style.width = width + '%';
	}
}

var a = 0;
var mks = 0;

Papa.parse("http://localhost:8888/NepalOSMHistory/data/sampledaily/nodes.csv", {
	download: true,
	dynamicTyping: true,
	delimiter: ",",
	step: function(row) {
		parseresponse(row.data[0]);
	},
	complete: function() {
		console.log("All done!");
		document.getElementById("myBar").remove();
		document.getElementById("myProgress").remove();
		map.addLayer(leafletView);
	}
});

// this function parses our response once we get it (see code above in fillmap() )
function parseresponse(c) {
	try {
		var marker = new PruneCluster.Marker(c[2], c[1]);
		marker.data.id = c[0];
		w = 0;
		var versions = []
		Papa.parse(c[3].slice(1, -1), {
			delimiter: ",",
			step: function(edit) {
				a += 1;
				if (a % hundredth == 0)
					move();
				w += 1;
				versions.push([c[edit.data[0][0]], c[edit.data[0][1]]]);
			}
		});
		if (w > 0) {
			marker.weight = w; // number of items in the cluster
			marker.data.versions = versions;
			mks += 1;
			markers.push(marker);
			leafletView.RegisterMarker(marker); // this is the slow part
		}
	} catch (err) { console.log(err + c); }
}
