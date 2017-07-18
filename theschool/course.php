<?php
session_start();
if(isset($_SESSION)){
    require 'connection.php';
    $select = "SELECT * FROM `course`";
    $query = mysqli_query($db_conn->getConnect(),$select);
    $rows = array();
    while($result = mysqli_fetch_row($query)) {
        $rows[] = $result;
    }
    header('Content-Type: application/json');
    echo json_encode($rows);
    $db_conn->closeConnect();
}