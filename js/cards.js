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