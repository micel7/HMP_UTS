<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
error_reporting(E_ALL); // Menampilkan semua error untuk debug
include 'connection.php';

$arr=[];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['news_id']) && isset($_GET['user_id'])) {
        $news_id = $_GET['news_id'];
        $user_id = $_GET['user_id'];

        $stmt = $conn->prepare("SELECT nilai FROM project_news_ratings WHERE news_id = ? AND user_id = ?");
        $stmt->bind_param("ii", $news_id, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            // Jika data ditemukan
            $arr = ["result" => "success", "has_rated" => true, "nilai" => $row['nilai']];
        } else {
            // Jika belum pernah ngerate
            $arr = ["result" => "success", "has_rated" => false];
        }
        $stmt->close();
    } else {
        $arr = ["result" => "error", "message" => "Parameter GET tidak lengkap"];
    }
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['news_id']) && isset($_POST['user_id']) && isset($_POST['rating'])) {
        $news_id = $_POST['news_id'];
        $user_id = $_POST['user_id'];
        $nilai   = $_POST['rating'];

        // Cek dulu sekali lagi agar tidak ada data ganda
        $check = $conn->prepare("SELECT * FROM project_news_ratings WHERE news_id = ? AND user_id = ?");
        $check->bind_param("ii", $news_id, $user_id);
        $check->execute();
        
        if ($check->get_result()->num_rows > 0) {
            $arr = ["result" => "error", "message" => "Anda sudah memberikan rating sebelumnya"];
        } else {
            $stmt = $conn->prepare("INSERT INTO project_news_ratings (news_id, user_id, nilai) VALUES (?, ?, ?)");
            $stmt->bind_param("iii", $news_id, $user_id, $nilai);
            
            if ($stmt->execute()) {
                $arr = ["result" => "success"];
            } else {
                $arr = ["result" => "error", "message" => "Gagal simpan: " . $stmt->error];
            }
            $stmt->close();
        }
        $check->close();
    } else {
        $arr = ["result" => "error", "message" => "Parameter POST tidak lengkap"];
    }
}

echo json_encode($arr);
$conn->close();
?>