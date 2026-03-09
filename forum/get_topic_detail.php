<?php
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");
$conn->set_charset("utf8mb4");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$topic_result = $conn->query("SELECT * FROM topics WHERE id = $id");
$topic = $topic_result->fetch_assoc();

$comment_result = $conn->query("SELECT * FROM comments WHERE topic_id = $id ORDER BY date ASC");
$comments = array();
while($row = $comment_result->fetch_assoc()) {
    $comments[] = $row;
}

if($topic) {
    $topic['comments'] = $comments; 
    echo json_encode($topic);
} else {
    echo json_encode(["error" => "ไม่พบกระทู้"]);
}
$conn->close();
?>