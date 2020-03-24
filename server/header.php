<?php
// Debug Fileds - Not required on production ////
// CORS open
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");

header('Cache-Control: no-cache, must-revalidate');
header("content-type:application/json");
