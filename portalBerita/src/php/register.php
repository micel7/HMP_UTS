<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nama = $_POST['nama'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $check = $conn->prepare("SELECT id FROM project_users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        echo json_encode(["result" => "error", "message" => "Email sudah terdaftar, gunakan email lain"]);
        exit;
    }


    $stmt = $conn->prepare("INSERT INTO project_users (nama, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nama, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["result" => "success", "message" => "Register berhasil"]);
    } else {
        echo json_encode(["result" => "error", "message" => "Gagal register"]);
    }
}?>