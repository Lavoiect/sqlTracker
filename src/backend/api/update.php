<?php
$postdata = file_get_contents("php://input");
include 'database.php';
echo('test');
//Get the posted data


if(isset($postdata) && !empty($postdata)){
    //Extract the data
    $request = json_decode($postdata);
  

    //Validate
if ((int)$request -> id < 1 || trim($request-> projectName) == '') {
    return http_response_code(400);
   
    
}

    //Sanitize
    
    $id = mysqli_real_escape_string($con, (int)$request->id);
    $projectName = mysqli_real_escape_string($con, trim($request->projectName));
    $leadDeveloper = mysqli_real_escape_string($con, trim($request->leadDeveloper));
    $projectScope = mysqli_real_escape_string($con, trim($request->projectScope));
    $dueDate = mysqli_real_escape_string($con, trim($request->dueDate));
  
    //Update
$sql = "UPDATE `projects` SET `projectName`= '$projectName', `leadDeveloper`='$leadDeveloper', `projectScope`='$projectScope', `dueDate`='$dueDate'  WHERE `id` = '{$id}' LIMIT 1";

if(mysqli_query($con, $sql)){
    http_response_code(204);
} else {
    return http_response_code(422);
}
}