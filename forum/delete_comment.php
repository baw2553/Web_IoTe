<?php
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");
$conn->set_charset("utf8");

$data = json_decode(file_get_contents('php://input'), true);

if ($data && isset($data['id'])) {
    $comment_id = $data['id'];
    $topic_id = $data['topic_id'];

    $sql = "DELETE FROM comments WHERE id = $comment_id";
    
    if ($conn->query($sql) === TRUE) {
        // ลดตัวเลขจำนวนคอมเมนต์ในหน้าหลักลง 1
        $conn->query("UPDATE topics SET replies = replies - 1 WHERE id = $topic_id");
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}
$conn->close();
?>