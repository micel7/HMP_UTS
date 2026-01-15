<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'connection.php';

// Terima input JSON atau POST form data
// Karena dari Ionic biasanya form-data, kita pakai $_POST
$user_id = isset($_POST['user_id']) ? $_POST['user_id'] : '';
$news_id = isset($_POST['news_id']) ? $_POST['news_id'] : '';

if (!empty($user_id) && !empty($news_id)) {
    
    // pengecekan apakah user like berita ini
    $check = $conn->prepare("SELECT id FROM project_favorites WHERE user_id = ? AND news_id = ?");
    $check->bind_param("ii", $user_id, $news_id);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        // SUDAH ADA AKAN DIDELETE (DELETE)
        $del = $conn->prepare("DELETE FROM project_favorites WHERE user_id = ? AND news_id = ?");
        $del->bind_param("ii", $user_id, $news_id);
        if ($del->execute()) {
            echo json_encode(["result" => "success", "action" => "removed", "message" => "Dihapus dari favorit"]);
        } else {
            echo json_encode(["result" => "error", "message" => "Gagal menghapus"]);
        }
    } else {
        // BELUM ADA AKAN INSERT (INSERT)
        $ins = $conn->prepare("INSERT INTO project_favorites (user_id, news_id) VALUES (?, ?)");
        $ins->bind_param("ii", $user_id, $news_id);
        if ($ins->execute()) {
            echo json_encode(["result" => "success", "action" => "added", "message" => "Ditambahkan ke favorit"]);
        } else {
            echo json_encode(["result" => "error", "message" => "Gagal menambahkan"]);
        }
    }
} else {
    echo json_encode(["result" => "error", "message" => "Data tidak lengkap"]);
}
?>