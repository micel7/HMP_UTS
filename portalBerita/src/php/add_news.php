<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $judul = $_POST['judul'];
    $deskripsi = $_POST['deskripsi'];
    $foto_utama = $_POST['foto_utama'];
    $categories = json_decode($_POST['categories']);
    $images = json_decode($_POST['images']);

    $check = $conn->prepare("SELECT id FROM project_news WHERE judul = ?");
    $check->bind_param("s", $judul);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        echo json_encode(["result" => "error", "message" => "Judul sudah ada, gunakan judul lain"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO project_news (user_id, judul, deskripsi, foto_utama) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $user_id, $judul, $deskripsi, $foto_utama);
    
    if ($stmt->execute()) {
        $news_id = $conn->insert_id;

        foreach ($categories as $cat_id) {
            $conn->query("INSERT INTO project_news_categories (news_id, category_id) VALUES ($news_id, $cat_id)");
        }

        foreach ($images as $img_url) {
            $conn->query("INSERT INTO project_news_images (news_id, url_gambar) VALUES ($news_id, '$img_url')");
        }

        echo json_encode(["result" => "success", "message" => "Berita berhasil diterbitkan"]);
    } else {
        echo json_encode(["result" => "error", "message" => "Gagal menyimpan berita"]);
    }
}
?>