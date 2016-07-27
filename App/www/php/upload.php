<?php
$ch = curl_init();
$url = 'http://pictaculous.com/api/1.0/';
 
$fields = array('image'=>file_get_contents('http://www.edenbrothers.com/store/media/_GroupPages/Corn.jpg'));
 
# Set some default CURL options
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
curl_setopt($ch, CURLOPT_URL, $url);
 
$json = curl_exec($ch);
header('Content-type: application/json');
$result = json_decode($json);
print_r($result);

foreach ($result as $key => $value) {
	echo $key;
}
?>