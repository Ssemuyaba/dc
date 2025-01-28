<?php
if($_SERVER["REQUEST_METHOD"]=="POST"){
	$name=
	htmlspecialchars($_POST['CName']);
	$email=
	htmlspecialchars($_POST['CEmail']);
	$message=
	htmlspecialchars($_POST['CMessage']);

	$to ="reflectdc256@gmail.com";

	$subject = "New Contact Form Submission";

	$body = "Name: $name\nEmail:
	$email\nMessage:\n$message";

	$headers ="From: $email";

	if (mail($to, $subject, $body,$headers)){
		echo "Message sent successfully!";

	} else{
		echo  "Failed to send the message.";
	}
}

?>