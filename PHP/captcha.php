<?php

$apikey = "af11bb32efa2bc275b71df84eb3033e5";

function getUserInfo(string $apikey)
{
    $url = "https://api.tertuyul.my.id/res.php?key=" . urlencode($apikey) .
           "&json=1&action=userinfo";
    $balance = @file_get_contents($url);
    $decoded = json_decode($balance, true);

    if (!is_array($decoded)) {
        echo "Gagal ambil data user\n";
        return;
    }

    echo "Email: "   . ($decoded['email']   ?? '-') . "\n";
    echo "Balance: " . ($decoded['balance'] ?? '-') . "\n";
}
//getUserInfo($apikey);




function captchaRequest(array $payload)
{
    $url = "https://api.tertuyul.my.id/in.php";

    if (!isset($payload["key"])) {
        global $apikey;
        $payload["key"] = $apikey;
    }
    $payload["json"] = 1;

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_TIMEOUT => 60,
    ]);

    $response = curl_exec($ch);

    if ($response === false) {
        $err = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException("cURL error: $err");
    }

    curl_close($ch);

    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
        throw new RuntimeException("Invalid JSON response: " . $response);
    }

    return $decoded;
}

function captchaResult(string $apikey, string $captchaId)
{
    $url = "https://api.tertuyul.my.id/res.php?&action=get&id=" . urlencode($captchaId) . "&key=" . urlencode($apikey) .
           "&json=1";
    while (true) {
        $raw = @file_get_contents($url);
        if ($raw === false) {
            echo "retry\n";
            sleep(3);
            continue;
        }

        // tampilkan raw response
        echo "$raw\n";

        $res = json_decode($raw, true);
        if (!is_array($res)) {
            echo "invalid: $raw\n";
            sleep(3);
            continue;
        }

        if (isset($res["status"]) && (int)$res["status"] === 1) {
            return $res['request'];
        }

        echo "wait $captchaId\n";
        sleep(3);
    }
}



function fa_iconSolver(string $apikey, string $base64Image)
{
    $res = captchaRequest([
        "key"    => $apikey,
        "method" => "hunter",
        "body"   => $base64Image,
        "json"   => "1",
    ]);

    if (!isset($res['status']) || $res['status'] != 1) {
        echo "error submit captcha \n";
        return null;
    }

    $captchaId = $res['request'];
    $solved    = captchaResult($apikey, $captchaId);
    return $solved;
}

/*
$imgData     = file_get_contents(__DIR__ . "/captcha.png");
$base64Image = base64_encode($imgData);
$res = fa_iconSolver($apikey, $base64Image);
print_r($res);
*/