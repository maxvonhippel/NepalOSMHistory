<?php
$features = array( '{"type":"Feature","geometry":{"type":"Point","coordinates":[85.3019553,27.7257842]},"properties":{"feature_id":31303849,"id":4627,"version":1,"uid":"7094","user":"Eratosthenes","timestamp":"2007-07-05T01:42:23+05:45"}}', '{"type":"Feature","geometry":{"type":"Point","coordinates":[85.4019553,26.7257842]},"properties":{"feature_id":1,"id":1,"version":1,"uid":"7","user":"Bob","timestamp":"2007-07-05T01:42:23+05:45"}}' );

// set php runtime to unlimited
set_time_limit(0);
// where does the data come from ? In real world this would be a SQL query or something
$data_source_file = 'data.txt';
// main loop
if (isset($_GET['feature'])) {
	// get content of data.txt
	$r = (int)$_GET['feature'];
        echo $r >= count($features) ? null : $features [(int)$_GET['feature']];
}
?>