<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/Db.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/lists/Lists.php';

//Collect and parse data from Angular HTTP Request.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$uid = $request->uid;
$title = $request->title;
$img = '';
$small_titl1 = isset($request->sm_title1) ? $request->sm_title1 : '';
$small_tip1 = isset($request->sm_tip1) ? $request->sm_tip1 : '';
$small_titl2 = isset($request->sm_title1) ? $request->sm_title1 : '';
$small_tip2 = isset($request->sm_tip2) ? $request->sm_tip2 : '';
$middle_title = isset($request->middle_title) ? $request->middle_title : '';
$item_type = isset($request->item_type) ? $request->item_type : '';
$tags = $request->type;
$actvie = $request->is_active;

$tags_str = '';
if(is_array($tags) && count($tags) > 0)
    $tags_str = implode(",", $tags);

$data_arr = array(
    $uid,
    $title,
    $img,
    $small_titl1,
    $small_tip1,
    $small_titl2,
    $small_tip2,
    $middle_title,
    $item_type,
    $tags_str,
    $actvie
);

//Connect to DB
$db_obj = new Database();
$db = $db_obj->getDB();

//Call the Signup class
$obj = new Lists($uid, $db);
$obj->addItem($data_arr);

