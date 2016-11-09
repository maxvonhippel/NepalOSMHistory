<?php
// https://github.com/pcrov/JsonReader/wiki/Examples
// http://www.howopensource.com/2014/12/introduction-to-server-sent-events/
require 'plugins/jsonreader/src/JsonReader.php';
use pcrov\JsonReader\JsonReader;

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$lastId = $_SERVER["HTTP_LAST_EVENT_ID"];
if (isset($lastId) && !empty($lastId) && is_numeric($lastId)) {
    $lastId = intval($lastId);
    $lastId++;
}
/*
while($reader->read("feature")) {
	echo $reader->value();
	sendMessage($lastId, $reader->value());
	$lastId++;
	sleep(2);
}
*/
//$reader = new JsonReader();
//$reader->open("data/dirtydate.json");

while (true) {
	/*
	$reader->read("feature")
	if ($reader->value()) {
		sendMessage($lastId, $reader->value());
		$lastId++;
	}
	sleep(2);
*/
    $data = "hello";
    
    if ($data) {
        sendMessage($lastId, $data);
        $lastId++;
    }
    
}

function sendMessage($id, $data) {
    echo "id: $id\n";
    echo "data: $data\n\n";
    ob_flush();
    flush();
}
?>