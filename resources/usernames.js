usernames=[
"Sazal(Solaris)",
"NamaBudhathoki",
"PratikGautam"];

if (GLOBALDEBUG == FALSE) {
	// try to connect to server
	$.get( "http://192.168.1.25:8000/usernames/")
	.done(function( data ) {
    	usernames = data;
    	console.log(data);
  	});
}