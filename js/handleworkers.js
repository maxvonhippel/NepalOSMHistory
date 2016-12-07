// move code
var width = 1; // current width out of 100 of the progress bar
var hundredth = 200000; // one one hundredth of the total number of nodes we will parse, approximately
// -------------------------- HELPER FUNCTIONS TO REMOVE PROGRESS BARS FROM UI ----------------------------------
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

// -------------------------- HELPER FUNCTION TO ANIMATE PROGRESS BAR UI ----------------------------------

// iterates the progress bar by 1%, or resets if at 100 (that shouldn't happen though)
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

var worker = new Worker('js/fillmap.js');

// Setup an event listener that will handle messages received from the worker.
worker.addEventListener('message', function(e) {
  // Log the workers message.
  if (e.data == "move!") {
  	// move the progress bar
  	console.log("move");
  	move();
  }
}, false);

function startworker() {
	worker.postMessage('fill!');
	console.log("begin fill");
}