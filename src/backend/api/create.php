<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate. 
  if(trim($request-> projectName) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $projectName = mysqli_real_escape_string($con, trim($request-> projectName));
  $leadDeveloper = mysqli_real_escape_string($con, trim($request-> leadDeveloper));
  $projectScope = mysqli_real_escape_string($con, trim($request-> projectScope));
  $dueDate = mysqli_real_escape_string($con, trim($request-> dueDate));
  
  // Create.
  $sql = "INSERT INTO `projects`(`id`,`projectName`,`leadDeveloper`, `projectScope`, `dueDate`) VALUES (null,'{$projectName}','{$leadDeveloper}', '{$projectScope}', '{$dueDate}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $project = [
      'projectName' => $projectName,
      'leadDeveloper' => $leadDeveloper,
      'projectScope' => $projectScope,
      'dueDate' => $dueDate,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($project);
    
  }
  else
  {
    http_response_code(422);
  }
}