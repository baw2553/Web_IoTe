<?php
$conn = new mysqli("localhost", "st67010305_iot_webboard", "85edn6MacjAmaQkK6QkK", "st67010305_iot_webboard");
$conn->set_charset("utf8");

$data = json_decode(file_get_contents('php://input'), true);

if ($data && isset($data['id'])) {
    $id = $data['id'];
    
    // 1. สั่งลบคอมเมนต์ทั้งหมดที่อยู่ในกระทู้นี้ก่อน
    $conn->query("DELETE FROM comments WHERE topic_id = $id");
    
    // 2. แล้วค่อยลบตัวกระทู้
    $sql = "DELETE FROM topics WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}
$conn->close();
?>