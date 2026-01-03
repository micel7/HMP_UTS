<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost";
$user = "hybrid_160423076";
$pass = "ubaya";
$db   = "hybrid_160423076";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["result" => "error", "message" => "Koneksi gagal"]));
}
?>