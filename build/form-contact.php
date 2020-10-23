<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$selectedProjects  = 'None';


$domain = $_SERVER['SERVER_NAME'];

$letter = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><title>New question | Luxeberry</title></head><body>";
if(isset($_POST['projects']) && is_array($_POST['projects']) && count($_POST['projects']) > 0){
    $selectedProjects = implode(', ', $_POST['projects']);
    $letter .= "<p>I’m interested in: ".htmlspecialchars($selectedProjects)."</p>";
}
if ($name) {
    $letter .= "<p>Name: ".htmlspecialchars($name)."</p>";
}
if ($email) {
    $letter .= "<p>Email: ".htmlspecialchars($email)."</p>";
}
if ($message) {
    $letter .= "<p>Project description:</p><div><pre>".htmlspecialchars($message)."</pre></div>";
}

$letter .= "</body></html>";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: <noreply@$domain>\r\n";
mail("vysotski@humandone.com.test-google-a.com", "New question | Humandone", $letter, $headers);

echo 'OK';
?>