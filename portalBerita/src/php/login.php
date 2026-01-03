<?php
include 'connection.php';

if (isset($_POST['email']) && isset($_POST['password'])) {
    
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM project_users WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            "id" => $row['id'],
            "result" => "success",
            "nama" => $row['nama'] // Mengambil kolom 'nama' dari tabel
        ]);
    } else {
        echo json_encode([
            "result" => "error",
            "message" => "Email atau Password salah!"
        ]);
    }
    
    $stmt->close();

} else {
    echo json_encode(["result" => "error", "message" => "Data tidak lengkap"]);
}

$conn->close();
?>