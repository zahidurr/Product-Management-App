<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/Db.php';
require $_SERVER['DOCUMENT_ROOT'].'/test/server/login/Login.php';

//Collect data from Angular HTTP Request.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $request->email;
$password = $request->password;

if($email == '' || $password == '') {
    //show empty form field error
    echo json_encode(
        array(
            "success" => 'false',
            "message" => 'Please check your credentials!'
        )
    );

    exit;
}

//call the class
$obj = new Login($email, $password);

//Json data
echo json_encode($obj->verifyUser());

