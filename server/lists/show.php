<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/Db.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/lists/Lists.php';

//Collect data from Angular HTTP Request.
$uid = isset($_GET['uid']) ? $_GET['uid'] : '';

//Connect to DB
$db_obj = new Database();
$db = $db_obj->getDB();

//call the class
$obj = new Lists($uid, $db);

$items = $obj->showItem();

$json_output = array(
    "items" => $items
);
//Json data
echo json_encode($json_output);
