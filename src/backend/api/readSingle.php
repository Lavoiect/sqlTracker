<?php

$data = json_decode(file_get_contents("php://input"));

include "database.php";

$sql = "SELECT * FROM projects WHERE `id` = '$data->id'";

$result = $con->query($sql);

if($result = mysqli_query($con,$sql))
{
  $row = mysqli_fetch_assoc($result);
  
    $project['id'] = $row['id'];
    $project['projectName'] = $row['projectName'];
    $project['leadDeveloper'] = $row['leadDeveloper'];
    $project['projectScope'] = $row['projectScope'];
    $project['dueDate'] = $row['dueDate'];
  

  echo json_encode($project);
}
else
{
  echo("read.php");
  http_response_code(404);
};
?>
