<?php
session_start();
if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['image'])){
    $name = ucfirst($_POST['name']);
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $image = $_POST['image'];
    if(isset($_POST['courses'])){
        $courses = implode(",",$_POST['courses']);
        
    }else{
        $courses = 'No Courses!';
    }
    require 'connection.php';
    $insert = "INSERT INTO `student`(`name`, `phone`, `email`, `image`, `course`) VALUES ('$name','$phone','$email','$image','$courses')";
    if(mysqli_query($db_conn->getConnect(),$insert)) {
        header('Content-Type: application/json');
        echo json_encode(true);
    } else {
        echo json_encode("Error: " . $sql . "<br>" . mysqli_error($db_conn->getConnect()));
    }
    //$new = ['1' => $name , '2' => $phone , '3' => $email , '4' => $image , '5' => $courses];
    
    $db_conn->closeConnect();
}
        //print_r (explode(",",$courses)); string to array DB to User!!!!