<?php
include 'connection.php';

header('Content-Type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = "SELECT c.*, COUNT(nc.news_id) as jumlahBerita 
            FROM project_categories c 
            LEFT JOIN project_news_categories nc ON c.id = nc.category_id 
            GROUP BY c.id";
    $result = $conn->query($sql);
    $data = [];
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode(["result" => "success", "data" => $data]);

} elseif ($method == 'POST') {
    $nama = $_POST['nama'];
    $icon = $_POST['icon'];
    $color = $_POST['color'];

    $sql = "INSERT INTO project_categories (nama_kategori, icon, color) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nama, $icon, $color);
    
    if ($stmt->execute()) {
        echo json_encode(["result" => "success", "message" => "Kategori berhasil dibuat"]);
    } else {
        echo json_encode(["result" => "error", "message" => "Gagal membuat kategori"]);
    }
}
?>