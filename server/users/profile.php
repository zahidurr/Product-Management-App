<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/Db.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/users/Users.php';

//Collect data from Angular HTTP Request.
$uid = isset($_GET['uid']) ? $_GET['uid'] : '';

//Connect to DB
$db_obj = new Database();
$db = $db_obj->getDB();

//call the class
$user_obj = new User($uid, $db);
$user_obj->getUserData();
$email = $user_obj->email;
$name = $user_obj->name;

$json_output = array(
    "name" => $name,
    "email" => $email
);
//Json data
echo json_encode($json_output);
