<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/Db.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/signup/Signup.php';

//Collect and parse data from Angular HTTP Request.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = strtolower(trim($request->email));
$password = trim($request->password);
$name = trim($request->name);

$signup_data_arr = array(
    $email,
    $password,
    $name
);

//Call the Signup class
$obj = new Signup($signup_data_arr);

//Show json data
echo json_encode($obj->verifySignup());
