<?php
require 'database.php';
echo('test');
// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate. 
  if(trim($request-> task) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $id = mysqli_real_escape_string($con, (int)$request->id);
  $projectId = mysqli_real_escape_string($con, (int)$request->projectId);
  $task = mysqli_real_escape_string($con, trim($request-> task));
  $taskDue = mysqli_real_escape_string($con, trim($request-> taskDue));
  
  // Create.
  $sql = "INSERT INTO `task`(`id`,`projectId`,`task`,`taskDue`) VALUES ('{$id}','{$projectId}','{$task}','{$taskDue}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $tasks = [
      'task' => $task,
      'taskDue' => $taskDue,
      'projectId' => $projectId,
      'id'    => $id,
    ];
    echo json_encode($tasks);
    
    
  }
  else
  {
    http_response_code(422);
  }
}