/*  this variable is a single flag that says if we are debugging
 * when we set this to true, the website uses entirely static data
 * when we set this to false, the website uses data from the Django server
 * since this script is imported in index.php, this variable can be accessed from
 * any of the other scripts in the project which are also in index.php, for use on
 * the front page (index.php) of the site
 */
 var GLOBALDEBUG = True;