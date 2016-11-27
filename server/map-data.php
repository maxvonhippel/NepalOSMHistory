<?php
// https://github.com/pcrov/JsonReader/wiki/Examples
// http://www.howopensource.com/2014/12/introduction-to-server-sent-events/

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$lastId = $_SERVER["HTTP_LAST_EVENT_ID"];
if (isset($lastId) && !empty($lastId) && is_numeric($lastId)) {
    $lastId = intval($lastId);
    $lastId++;
}

require_once dirname(__FILE__) . '/plugins/phpjson/vendor/autoload.php';

$testfile = dirname(__FILE__) . '/data/dirtydate.json';

$listener = new \JsonStreamingParser\Listener\GeoJsonListener(function ($item) {
    //var_dump($item);
    $data = json_encode($item);
    if ($data) {
	   sendMessage($lastId, $data);
	   $lastId++;
    }
});
$stream = fopen($testfile, 'r');
try {
    $parser = new \JsonStreamingParser\Parser($stream, $listener);
    $parser->parse();
	sendMessage("end", "end");
    fclose($stream);
} catch (Exception $e) {
    fclose($stream);
    throw $e;
}

function sendMessage($id, $data) {
    echo "id: $id\n";
    echo "data: $data\n\n";
    ob_flush();
    flush();
}


?>