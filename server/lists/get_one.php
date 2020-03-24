<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/Db.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/lists/Lists.php';

//Collect data from Angular HTTP Request.
$lid = isset($_GET['lid']) ? $_GET['lid'] : '4';
$uid = isset($_GET['uid']) ? $_GET['uid'] : '';

//Connect to DB
$db_obj = new Database();
$db = $db_obj->getDB();

//call the class
$obj = new Lists($uid, $db);

$item = $obj->showOneItem($lid);

$json_output = array(
    "item" => $item
);
//Json data
echo json_encode($json_output);
