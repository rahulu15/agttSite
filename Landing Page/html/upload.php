<?php
header('Content-Type: application/json');

$uploaded = array();

if(!empty($_FILES['file']['name'][0])){
  foreach($_FILES['file']['name'] as $position =>$name){
    if(move_uploaded_file($_FILES['file']['tmp_name'][$position],'C:/xampp/htdocs/AUDIO PLAYER/'.$name)){
      $uploaded[] = array(
        'name' => $name,
        'file' => 'uploads/'
      );
    }
  }
}
echo json_encode($uploaded);
