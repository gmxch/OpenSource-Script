<?php

@unlink("adlink.txt");

function cURL($url, $method = 'GET', $postData = null, $cookieFile = null, $headers = [], $referer = '', $userAgent = 'Mozilla/5.0') {
    $ch = curl_init($url);

    $defaultHeaders = [
        "Accept: */*",
        "Content-Type: application/x-www-form-urlencoded"
    ];
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT => $userAgent,
        CURLOPT_REFERER => $referer,
        CURLOPT_HTTPHEADER => array_merge($defaultHeaders, $headers),
    ]);

    if ($cookieFile) {
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);
    }

    if (strtoupper($method) === 'POST' && $postData) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, is_array($postData) ? http_build_query($postData) : $postData);
    }

    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}


$url = readline("adlink: ");
$host = parse_url($url, PHP_URL_HOST) ?? '';
$path = parse_url($url, PHP_URL_PATH) ?? '';

$urlMap = "blog.adlink.click";
$referer = "https://www.diudemy.com/";
$shortlink = str_replace("link.adlink.click", $urlMap, $url);

$cookieFile = __DIR__ . "/adlink.txt";
$start = cURL($shortlink, 'GET', null, $cookieFile, [], $referer);

preg_match(
    '/name="ad_form_data" value="([^"]+)"/', $start, $adMatch);
preg_match(
    '/name="_csrfToken"\s+[^>]*value="([^"]+)"/i', $start, $csrfMatch);
preg_match(
    '/name="_Token\[fields\]"[^>]+value="([^"]+)"/', $start, $fieldsMatch);
preg_match(
    '/name="_Token\[unlocked\]"[^>]+value="([^"]+)"/', $start, $unlockMatch);

$ad_form_data   = $adMatch[1] ?? '';
$csrf           = $csrfMatch[1] ?? '';
$token_fields   = $fieldsMatch[1] ?? '';
$token_unlocked = $unlockMatch[1] ?? '';

//echo "\n$ad_form_data\n$csrf\n$token_fields\n$token_unlocked\n";
echo "wait\t";
sleep(4);



$postData = [
    '_method' => 'POST',
    '_csrfToken' => $csrf,
    'ad_form_data' => $ad_form_data,
    '_Token[fields]' => $token_fields,
    '_Token[unlocked]' => $token_unlocked
];

$final = cURL("https://{$urlMap}/links/go", 'POST', $postData, $cookieFile, [
    "X-Requested-With: XMLHttpRequest",
    "Accept: application/json,text/javascript,*/*;q=0.01"
], $referer);
$data = json_decode($final, true);
echo "Status: {$data['status']}\n";
echo "URL: {$data['url']}\n";
