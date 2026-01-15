<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include 'connection.php'; // Pastikan nama file koneksi benar

// Tangkap data dari POST (lebih aman untuk hapus data)
$news_id = isset($_POST['news_id']) ? intval($_POST['news_id']) : 0;
$user_logged_in = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;

if ($news_id == 0 || $user_logged_in == 0) {
    echo json_encode(["result" => "error", "message" => "ID Berita atau User tidak valid."]);
    exit;
}

// 1. Cek dulu siapa pemilik berita ini
$sql_check = "SELECT user_id FROM project_news WHERE id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("i", $news_id);
$stmt_check->execute();
$result = $stmt_check->get_result();
$row = $result->fetch_assoc();

if ($row) {
    $author_id = intval($row['user_id']);
    
    // 2. Logika Hak Akses: Pemilik Berita ATAU Admin (ID 1)
    if ($user_logged_in === $author_id || $user_logged_in === 1) {
        
        // OPTIONAL: Hapus data di tabel relasi agar tidak error (categories & comments)
        $conn->query("DELETE FROM project_news_categories WHERE news_id = $news_id");
        $conn->query("DELETE FROM project_comments WHERE news_id = $news_id");
        
        // 3. Hapus Berita Utama
        $sql_delete = "DELETE FROM project_news WHERE id = ?";
        $stmt_del = $conn->prepare($sql_delete);
        $stmt_del->bind_param("i", $news_id);
        
        if ($stmt_del->execute()) {
            echo json_encode(["result" => "success", "message" => "Berita berhasil dihapus!"]);
        } else {
            echo json_encode(["result" => "error", "message" => "Gagal menghapus dari database."]);
        }
    } else {
        echo json_encode(["result" => "error", "message" => "Anda tidak memiliki akses untuk menghapus berita ini."]);
    }
} else {
    echo json_encode(["result" => "error", "message" => "Berita tidak ditemukan."]);
}

$conn->close();
?>