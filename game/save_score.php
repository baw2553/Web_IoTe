<?php
header("Content-Type: application/json; charset=UTF-8");
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['player_name']) && isset($data['score'])) {
    $name = $conn->real_escape_string($data['player_name']);
    $avatar = $conn->real_escape_string($data['avatar_url']);
    $score = (int)$data['score'];

    $sql = "INSERT INTO leaderboard (player_name, avatar_url, score) VALUES ('$name', '$avatar', $score)";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
}
$conn->close();
?>