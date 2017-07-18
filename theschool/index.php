<?php
session_set_cookie_params(0);
session_start();
if(isset($_SESSION['name'])){
    $user = ['name' => $_SESSION['name'] ,
             'role' => $_SESSION['role']
            ];
    header('Content-Type: application/json');
    echo json_encode($user);
}else{
    header('Content-Type: application/json');
    echo json_encode(false);
}