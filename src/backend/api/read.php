
<?php

require 'database.php';


$tasks = [];
$sql = "SELECT id, projectName, leadDeveloper, projectScope, dueDate FROM projects";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $project[$i]['id'] = $row['id'];
    $project[$i]['projectName'] = $row['projectName'];
    $project[$i]['leadDeveloper'] = $row['leadDeveloper'];
    $project[$i]['projectScope'] = $row['projectScope'];
    $project[$i]['dueDate'] = $row['dueDate'];
    $i++;
  }

  echo json_encode($project);
}
else
{
  echo("read.php");
  http_response_code(404);
};

