<?php
$host = "localhost";
$user = "st67010305_iot_webboard";
$pass = "85edn6MacjAmaQkK6QkK";
$db   = "st67010305_iot_webboard";

$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM topics ORDER BY id DESC";
$result = $conn->query($sql);

$topics = array();
while($row = $result->fetch_assoc()) {
    $topics[] = $row;
}

header('Content-Type: application/json');
echo json_encode($topics);

$conn->close();
?>