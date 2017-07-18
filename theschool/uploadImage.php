<?php
session_start();
if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    $result = ["err" => "true"];
    $target_dir = "../theschool/uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = true;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
     // Check file size
    if ($_FILES["file"]["size"] > 500000) {
        array_push($result, ["large" => "Sorry, your file is too large."]);
        $uploadOk = false;
    }
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        array_push($result, ["type" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."]);
    $uploadOk = false;
    }
    if($uploadOk = true){
    move_uploaded_file($_FILES['file']['tmp_name'], '../theschool/uploads/' . $_FILES['file']['name']);  
        echo json_encode($uploadOk);
    }else{
        echo json_encode($result);
    }
}

?>
