<?php

require 'database.php';


$task = [];
$sql = "SELECT id, projectId, task, taskDue FROM task";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $task[$i]['id'] = $row['id'];
    $task[$i]['projectId'] = $row['projectId'];
    $task[$i]['task'] = $row['task'];
    $task[$i]['taskDue'] = $row['taskDue'];
    $i++;
  }

  echo json_encode($task);
}
else
{
  echo("read.php");
  http_response_code(404);
};
