<?php

$apiKey = 'A1bhgDnqX63EGL50ez0rF3QR5Ea1czfJ';
$pageUrl = 'https://geekgrove.net'; 

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.sctg.xyz/in.php",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'key' => $apiKey,
        'method' => 'turnstile',
        'pageurl' => $pageUrl,
        'sitekey' => '0x4AAAAAAB5TRnwvGvH5b2kw',
        'action' => 'linkSubmit'
    ]),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/x-www-form-urlencoded"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error: $err\n";exit;}

if (strpos($response, 'OK|') !== 0) {
    echo "Gagal submit ke solver: $response\n";exit;}

$taskId = explode('|', $response)[1];
echo "ID task: $taskId\n";

// Step 2
$maxAttempts = 10;
$attempt = 0;
$token = null;

while ($attempt < $maxAttempts) {
    sleep(3);
    $pollCurl = curl_init();
    curl_setopt_array($pollCurl, [
        CURLOPT_URL => "https://api.sctg.xyz/res.php?key=$apiKey&id=$taskId&action=linkSubmit",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "GET",
    ]);

    $pollResponse = curl_exec($pollCurl);
    $pollErr = curl_error($pollCurl);
    curl_close($pollCurl);

    if ($pollErr) {
        echo "Polling error: $pollErr\n";exit;}
    if (strpos($pollResponse, 'OK|') === 0) {
        $token = explode('|', $pollResponse)[1];break;}
    echo "Polling ke-$attempt: belum siap...\n";
    $attempt++;
}

if ($token) {
    echo "\nToken Turnstile berhasil diambil:\n$token\n";
} else {
    echo "\nGagal ambil token setelah $maxAttempts percobaan.\n";
}

function generateTTL($length) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $str = '';
    $bytes = random_bytes($length);
    for ($i = 0; $i < $length; $i++) {
        $str .= $chars[ord($bytes[$i]) % strlen($chars)];
    }
    return $str;
}

$linkCont = random_int(12345, 54321);
$u = $linkCont + 587841;
$ttl = generateTTL();

// Bangun payload
$payload = [
    'linkCont' => $linkCont,
    'response' => $token,
    'i' => 0,
    'c' => null,
    'u' => $u,
    'ttl' => $ttl,
    'bg' => null,
    'linkVer' => 'ct'
];

// Tampilkan hasil
echo "\nPayload untuk challenge 'ct':\n";
echo json_encode($payload, JSON_PRETTY_PRINT) . "\n";