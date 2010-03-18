<?php

$EmailFrom = "site@railsjedi.com"; // 'From' Email
$EmailTo = "railsjedi@gmail.com"; // Your Email (Where the Messages Are Sent)
$Subject = "Message From Your Site"; // Email Subject Title
$Name = Trim(stripslashes($_POST['name'])); 
$Email = Trim(stripslashes($_POST['email'])); 
$Message = Trim(stripslashes($_POST['message'])); 

// Validation
$validationOK=true;
if (!$validationOK) {
  exit;
}

// Setup the Body of the Email
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// Send Email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");
?>