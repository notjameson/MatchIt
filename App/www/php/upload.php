<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$ch = curl_init();

# Url for API, THIS WILL NOT CHANGE
$url = 'http://pictaculous.com/api/1.0/';

# Image to be passed, eventually this will be custom
$img = file_get_contents('php://input');
$fields = array('image'=>file_get_contents($img));
 
# Set some default CURL options
# Still struggling to understand all of these
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
curl_setopt($ch, CURLOPT_URL, $url);

# Submit the request
$json = curl_exec($ch);

# Create array to collect data returned
$list = array();

# Decode the returned JSON object into something PHP can handle
$arr = json_decode($json, true);
//print_r($arr);
# Loop that will push the values into an array (and remove redundant quotation
# marks)
foreach ($arr as $key => $value) {
	array_push($list, $key);
	foreach ($value as $key2 => $value2) {
		array_push($list, $key2);

	}
}

# Send it back to the controller
# We can send this bitch up, it can't go down
echo json_encode($arr);
?>