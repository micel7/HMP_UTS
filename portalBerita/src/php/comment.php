<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'connection.php';
$method = $_SERVER['REQUEST_METHOD'];

// Mengambil komentar

if ($method === 'GET') {
 if (isset($_GET['news_id'])){
	$news_id = intval($_GET['news_id']);
	
	 // Mengambil komentar beserta balasan (parent_id)
        $sql = "SELECT c.id, c.user_id, u.nama as username, c.content as isi, c.parent_id, c.created_at as tanggal 
                FROM project_comments c
		JOIN project_users u ON c.user_id = u.id
                WHERE c.news_id = ? 
                ORDER BY c.created_at DESC";
                
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $news_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $comments = [];
        while ($row = $result->fetch_assoc()) {
            // Kita kirim flat, biarkan Angular yang menyusun pohon balasan
            $row['id'] = intval($row['id']);
            $row['user_id'] = intval($row['user_id']);
            $row['parent_id'] = $row['parent_id'] ? intval($row['parent_id']) : null;
            $comments[] = $row;
        }
        
        echo json_encode(["result" => "OK", "data" => $comments]);
    } else {
        echo json_encode(["result" => "ERROR", "message" => "news_id tidak ditemukan"]);
    }
}

// Menambah komentar atau reply komentar

else if ($method === 'POST') {
    // Mengambil data dari x-www-form-urlencoded
    $news_id   = isset($_POST['news_id']) ? intval($_POST['news_id']) : null;
    $user_id   = isset($_POST['user_id']) ? intval($_POST['user_id']) : null;
    $content   = isset($_POST['content']) ? $_POST['content'] : '';
    $parent_id = (isset($_POST['parent_id']) && $_POST['parent_id'] !== '') ? intval($_POST['parent_id']) : null;

    if ($news_id && $user_id && !empty($content)) {
        $sql = "INSERT INTO project_comments (news_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iisi", $news_id, $user_id, $content, $parent_id);
        
        if ($stmt->execute()) {
            echo json_encode(["result" => "OK", "message" => "Komentar berhasil disimpan"]);
        } else {
            echo json_encode(["result" => "ERROR", "message" => "Gagal menyimpan ke database"]);
        }
    } else {
        echo json_encode(["result" => "ERROR", "message" => "Data tidak lengkap"]);
    }
}

$conn->close();
?>