<?php
@unlink(__DIR__ . "/cookies.txt");
$url = readline("coinclix: ");
if (!$url) {
    echo "URL is required.\n";exit(1);}

// Step 1
$html = @file_get_contents($url);
if ($html === false) {
    echo "Failed to fetch content from {$url}\n";exit(1);}

// Step 2
preg_match(
    '/<strong class="user-select-none">https:\/\/([^<]+)<\/strong>/', $html, $domainMatch);
preg_match(
    '/data-clipboard-text="([A-Za-z0-9]{5})"/', $html, $codeMatch);
$domain = $domainMatch[1] ?? '';
$code = $codeMatch[1] ?? '';

if (!$domain || !$code) {
    echo "Could not extract domain or code.\n";exit(1);}

echo "Extracted:\nDomain: {$domain}\nCode: {$code}\n";


// Step 3
$linkInitUrl = "https://{$domain}link/process/";
$payload = json_encode(["linkInit" => $code]);
$cookieFile = __DIR__ . "/cookies.txt";

$ch = curl_init($linkInitUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_COOKIEJAR => $cookieFile,
    CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
]);
$response = curl_exec($ch);
curl_close($ch);

if (!$response) {
    echo "Failed to send linkInit request.\n";exit(1);}

$data = json_decode($response, true);
$htmlMessage = $data['message'] ?? '';
echo "\n====== HTML Message ======\n";
echo ($htmlMessage) . "\n";
echo "==========================\n";
// Step 4
exit;
preg_match('/href="([^"]+)"/', $htmlMessage, $match);
$continuePath = $match[1] ?? '';

if (!$continuePath) {
    echo "Could not find Continue link in HTML.\n";exit(1);}

$continueUrl = "https://" . rtrim($domain, "/") . $continuePath;
echo "Continue URL: {$continueUrl}\n";

// Step 5
$ch = curl_init($continueUrl);
curlsetoptarray($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_COOKIEFILE => $cookieFile,
    CURLOPT_REFERER => $linkInitUrl,
    CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    CURLOPT_FOLLOWLOCATION => true,
]);
$step1Html = curl_exec($ch);
curl_close($ch);

if (!$step1Html) {
    echo "❌ Failed to load Step 1 page.\n";exit(1);}

//fileputcontents(DIR . "/step1.html", $step1Html);
//echo "Step 1 page saved to step1.html\n";

// Step 6 Parsing
preg_match(
    '/<input[^>]+id="pissoff"[^>]+value="([^"]+)"/', $step1Html, $pissoffMatch);
preg_match(
    '/<span[^>]+class="cnnc"[^>]+id="([^"]+)"/', $step1Html, $cnncMatch);
preg_match(
    '/<input[^>]+id="linkVer"[^>]+value="([^"]+)"/', $step1Html, $linkVerMatch);
preg_match(
    '/Step\s-\s(\d+)\s\/\s(\d+)/', $step1Html, $stepMatch);

$pissoff   = $pissoffMatch[1] ?? '';
$cnnc      = $cnncMatch[1] ?? '';
$linkver   = $linkVerMatch[1] ?? '';
$stepNow   = $stepMatch[1] ?? '';
$stepTotal = $stepMatch[2] ?? '';
$i         = $stepNow !== '' ? intval($stepNow) - 1 : 0;

echo "\n====== Final Extracted Values ======\n";
echo "pissoff : {$pissoff}\n";
echo "cnnc    : {$cnnc}\n";
echo "linkver : {$linkver}\n";
echo "STEP    : {$stepNow} / {$stepTotal} (i = {$i})\n";
//exit;
$timestamp = time();
if ($linkver === 'cc') {
    require_once 'cc-payload.php';
    $payload = buildCcPayload($cnnc, $pissoff);
    //$payload['pissoff'] = $pissoff;
    //require_once 'cc-payload.js';
    //$payload = buildCcPayload($pissoff, $cnnc, $i, $timestamp);
    echo "\ncc Payload:\n";
    echo jsonencode($payload, JSONPRETTY_PRINT) . "\n";
} else {
    die;
}
/*elseif ($linkver === 'ct') {
    require_once 'ct-payload.php';
    if (!isset($payload)) {
        echo "Gagal membangun payload untuk challenge 'ct'.\n";
        exit;
    }
    echo "\nct Payload:\n";
    echo jsonencode($payload, JSONPRETTY_PRINT) . "\n";
} */
sleep(3);

function extractAllCookies($cookieFile) {
    $cookies = [];
    $lines = file($cookieFile, FILEIGNORENEWLINES | FILESKIPEMPTYLINES);
    foreach ($lines as $line) {
        if (strpos($line, '#') === 0 || trim($line) === '') continue;
        $fields = preg_split('/\s+/', $line);
        if (count($fields) >= 7) {
            $name = $fields[5];
            $value = $fields[6];
            $cookies[] = "{$name}={$value}";
        }
    }
    return implode('; ', $cookies);
}
// Step 7
echo "\n====== Cookie Sent ======\n";
echo filegetcontents($cookieFile) . "\n";

$processUrl = "https://{$domain}link/process/";
$sessidHeader = extractAllCookies($cookieFile);
sleep(5);
$ch = curl_init($processUrl);
curlsetoptarray($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPTPOSTFIELDS => jsonencode($payload),
    CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Accept: application/json",
    "Origin: https://{$domain}",
    "Cookie: {$sessidHeader}"
    ],
    CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    CURLOPT_REFERER => $continueUrl,
]);

$step2html = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

echo "\n====== Server Response ======\n";
if ($err) {
    echo "❌ cURL Error: $err\n";
} else {
    echo $step2html . "\n";
}



