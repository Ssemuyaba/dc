<?php
if($_SERVER["REQUEST_METHOD"]=="POST"){
	$name=
	htmlspecialchars($_POST['cName']);
	$email=
	htmlspecialchars($_POST['cEmail']);
	$message=
	htmlspecialchars($_POST['cMessage']);

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
