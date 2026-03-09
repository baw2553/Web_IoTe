<?php
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");
$conn->set_charset("utf8mb4");

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    
    $title = $conn->real_escape_string($data['title']);
    $author = $conn->real_escape_string($data['author']);
    $category = $conn->real_escape_string($data['category']);
    
    $content = isset($data['content']) ? $conn->real_escape_string($data['content']) : '';

    $sql = "INSERT INTO topics (title, author, category, content) 
            VALUES ('$title', '$author', '$category', '$content')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}
$conn->close();
?>