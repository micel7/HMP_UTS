<?php
include 'connection.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $conn->query("UPDATE project_news SET views = views + 1 WHERE id = $id");

    $sql = "SELECT n.*, AVG(r.nilai) as avg_rating 
            FROM project_news n 
            LEFT JOIN project_ratings r ON n.id = r.news_id 
            WHERE n.id = $id GROUP BY n.id";
    $res = $conn->query($sql)->fetch_assoc();

    $img_res = $conn->query("SELECT url_gambar FROM project_news_images WHERE news_id = $id");
    $res['gambarHalaman'] = [];
    while($img = $img_res->fetch_assoc()) { $res['gambarHalaman'][] = $img['url_gambar']; }

    echo json_encode(["result" => "success", "data" => $res]);

} else {
    $query = isset($_GET['search']) ? $_GET['search'] : '';
    
    $sql = "SELECT n.*, AVG(r.nilai) as rating_rata 
            FROM project_news n 
            LEFT JOIN project_ratings r ON n.id = r.news_id 
            WHERE n.judul LIKE '%$query%' 
            GROUP BY n.id";
    
    $result = $conn->query($sql);
    $data = [];
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode(["result" => "success", "data" => $data]);
}
?>