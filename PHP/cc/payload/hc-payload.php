<?php
// Fungsi acak string TTL
function generateTTL($length = 15) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $ttl = '';
    for ($i = 0; $i < $length; $i++) {
        $ttl .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $ttl;
}


$response = readline("Masukkan token hCaptcha (response): ");

// Timestamp
$linkCont = time();
$u = $linkCont + 587841;
$ttl = generateTTL();

// Bangun payload
$payload = [
    'linkCont' => $linkCont,
    'response' => $response,
    'i' => 0,
    'c' => null,
    'u' => $u,
    'ttl' => $ttl,
    'bg' => null,
    'linkVer' => 'hc'
];

// Tampilkan hasil
echo "\nPayload untuk challenge 'hc':\n";
echo json_encode($payload, JSON_PRETTY_PRINT) . "\n";