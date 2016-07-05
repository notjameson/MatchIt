<?php 
$target = '../uploads/';
$target = $target . basename( $_FILES['fileToUpload']['name']);
$ok=1;  
if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target)) {
 echo "The file has been uploaded"; 
} else { 
	echo "Sorry, there was a problem uploading your file.";
} 
?>