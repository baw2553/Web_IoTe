<?php
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");
$conn->set_charset("utf8mb4");

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $topic_id = $data['topic_id'];
    $author = $data['author'];
    $message = $data['message'];

    $sql = "INSERT INTO comments (topic_id, author, message) VALUES ($topic_id, '$author', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        $conn->query("UPDATE topics SET replies = replies + 1 WHERE id = $topic_id");
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
$conn->close();
?>