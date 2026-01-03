<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Menangkap data dari Ionic
    $nama = isset($_POST['nama']) ? $_POST['nama'] : '';
    $icon = isset($_POST['icon']) ? $_POST['icon'] : '';
    $color = isset($_POST['color']) ? $_POST['color'] : '';

    // Perintah SQL untuk memasukkan data ke tabel
    $sql = "INSERT INTO project_categories (nama_kategori, icon, color) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nama, $icon, $color);

    if ($stmt->execute()) {
        echo json_encode(["result" => "success"]);
    } else {
        echo json_encode(["result" => "error", "message" => "Gagal simpan"]);
    }
}
?>