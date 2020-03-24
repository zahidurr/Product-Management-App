<?php
require $_SERVER['DOCUMENT_ROOT'].'/test/server/header.php';

$target_path = "uploads/";
if (!file_exists("uploads")) {
    mkdir("uploads", 0777, true);
}
$target_path = $target_path .basename($_FILES['photo']['name']);

if (move_uploaded_file($_FILES['photo']['tmp_name'], $target_path)) {
    $output = shell_exec('python ./predict.py');
    echo json_encode($output);
} else {
    echo $target_path;
    echo "There was an error uploading the file, please try again!";
}