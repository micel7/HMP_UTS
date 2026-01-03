<?php
session_start();
include 'koneksi.php';

if (!isset($_SESSION['user_id'])) {
    die("Anda harus login terlebih dahulu.");
}

$news_id = $_GET['id'];
$user_logged_in = $_SESSION['user_id'];

$sql = "DELETE FROM news WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $news_id, $user_logged_in);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo "<script>alert('Berita berhasil dihapus!'); window.location='index.php';</script>";
    } else {
        echo "Gagal: Berita tidak ditemukan atau Anda tidak memiliki akses.";
    }
} else {
    echo "Terjadi kesalahan database.";
}

$stmt->close();
$conn->close();