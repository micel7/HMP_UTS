<?php
session_start();

include 'connection.php';
header('Content-Type: application/json');

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");



if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt_update = $conn->prepare("UPDATE project_news SET views = views + 1 WHERE id = ?");
    $stmt_update->bind_param("i", $id);
    $stmt_update->execute();

    $sql = "SELECT n.id, n.judul, n.deskripsi AS konten, n.foto_utama AS foto, n.views, AVG(r.nilai) as rating, 
    	(SELECT COUNT(*) FROM project_comments WHERE news_id = n.id) AS jumlah_komentar,
    	GROUP_CONCAT(DISTINCT c.nama_kategori SEPARATOR ', ') AS categories
        FROM project_news n 
           	LEFT JOIN project_news_ratings r ON n.id = r.news_id 
    		LEFT JOIN project_news_categories pnc ON n.id = pnc.news_id
    		LEFT JOIN project_categories c ON pnc.category_id = c.id  
        WHERE n.id = ? 
    	GROUP BY n.id";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();

    if($res) {
    $img_res = $conn->query("SELECT url_gambar FROM project_news_images WHERE news_id = $id");
        $res['gambarHalaman'] = [];
        while($img = $img_res->fetch_assoc()) { $res['gambarHalaman'][] = $img['url_gambar']; }

	$res['jumlah_komentar'] = (int)$res['jumlah_komentar'];
	$res['rating'] = $res['rating'] ? (float)$res['rating'] : 0;
	$res['views'] = (int)$res['views'];

        echo json_encode(["result" => "success", "data" => $res]);
    } else {
	echo json_encode(["result" => "error", "message" => "Berita tidak ditemukan"]);
    }
} else {
    $query = isset($_GET['search']) ? "%" . $_GET['search'] . "%" : "%";

    $sql = "SELECT n.id, n.judul, n.deskripsi AS konten, n.foto_utama AS foto, n.views, AVG(r.nilai) as rating, 
	    (SELECT COUNT(*) FROM project_comments WHERE news_id = n.id) AS jumlah_komentar,
	    GROUP_CONCAT(DISTINCT c.nama_kategori) AS categories
            FROM project_news n 
           	 LEFT JOIN project_news_ratings r ON n.id = r.news_id
           	 LEFT JOIN project_news_categories pnc ON n.id = pnc.news_id 
           	 LEFT JOIN project_categories c ON pnc.category_id = c.id
            WHERE n.judul LIKE ? 
            GROUP BY n.id";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $query);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while($row = $result->fetch_assoc()) {
        if($row['categories']) {
		$row['categories'] = explode(',', $row['categories']);
	} else {
		$row['categories'] = [];
     }

	$row['jumlah_komentar'] = (int)$row['jumlah_komentar'];
	$row['rating'] = $row['rating'] ? (float)$row['rating'] : 0;
        $row['views'] = (int)$row['views'];
        $row['id'] = (int)$row['id'];

	$data[] = $row;
    }
    echo json_encode(["result" => "success", "data" => $data]);
}
?>