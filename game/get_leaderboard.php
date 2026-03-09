<?php
header("Content-Type: application/json; charset=UTF-8");
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$sql = "SELECT player_name, avatar_url, score FROM leaderboard ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$leaderboard = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;
    }
}

echo json_encode($leaderboard);
$conn->close();
?>