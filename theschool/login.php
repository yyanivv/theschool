<?php
session_start();
if(isset($_POST['email']) && isset($_POST['password'])){
    require 'connection.php';
    $email = $_POST['email'];
    $password = $_POST['password'];
    $select = "SELECT * FROM `administrator` WHERE email = '$email' and password = '$password'";
    $query = mysqli_query($db_conn->getConnect(),$select);
    $result = mysqli_fetch_assoc($query);
    if($result){
        $_SESSION['name'] = $result['name'];
        $_SESSION['role'] = $result['role'];
        header('Content-Type: application/json');
        echo json_encode($result);
    }else{
        header('Content-Type: application/json');
        echo json_encode(false);
    }
    $db_conn->closeConnect();
}
