<?php
@unlink("cookie.txt");


function cURL($url, $method = 'GET', $postData = null, $cookieFile = null, $headers = [], $referer = '', $debug = false, $verbose = false) {
    $ch = curl_init($url);

    // Default headers
    $defaultHeaders = [
        "Accept: */*",
        "Content-Type: application/x-www-form-urlencoded",
        "referer: $referer"
    ];
    $hasContentType = false;
    foreach ($headers as $h) {
        if (stripos($h, 'Content-Type:') === 0) {
            $hasContentType = true;
            break;
        }
    }
    if ($hasContentType) {
        $defaultHeaders = array_filter($defaultHeaders, function($h) {
            return stripos($h, 'Content-Type:') !== 0;
        });
    }
    $finalHeaders = array_merge($defaultHeaders, $headers);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        CURLOPT_REFERER => $referer,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_HTTPHEADER => $finalHeaders,
        CURLOPT_TIMEOUT => 15
    ]);

    if ($verbose) {
        $logFile = fopen("curl_debug.log", "a");
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_STDERR, $logFile);
    }

    if ($debug) {
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    }

    if ($cookieFile) {
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);
    }

    if (strtoupper($method) === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        $isJson = false;
        foreach ($finalHeaders as $h) {
            if (stripos($h, 'Content-Type: application/json') !== false) {
                $isJson = true;
                break;
            }
        }
        if ($isJson || is_string($postData)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        } else {
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        }
    }

    $response = curl_exec($ch);

    if ($response === false) {
        echo "cURL Error: " . curl_error($ch) . "\n";
    } elseif ($debug) {
        $info = curl_getinfo($ch);
        $headerSize = $info['header_size'];
        $headerText = substr($response, 0, $headerSize);
        $body = substr($response, $headerSize);

        echo "=== HTTP STATUS: {$info['http_code']} ===\n";
        echo "--- Request Headers ---\n";
        echo $info['request_header'] ?? "(not available)\n";
        echo "--- Response Headers ---\n";
        echo $headerText;
        echo "--- Response Body ---\n";
        echo $body . "\n";
    }

    curl_close($ch);

    if (isset($logFile) && is_resource($logFile)) {
        fclose($logFile);
    }

    return $response;
}


//$url = readline("coinclix: ");
$url = "https://coinclix.co/go/tqYIXV";

$host = parse_url($url, PHP_URL_HOST) ?? '';
$path = parse_url($url, PHP_URL_PATH) ?? '';
echo "URL: $host\tID: $path\n";
//$referer = $host;
$cc = cURL($url, 'GET', null);
file_put_contents("cc.html", $cc);

preg_match(
    '/<strong class="user-select-none">https:\/\/([^<]+)<\/strong>/', $cc, $domainMatch);
preg_match(
    '/data-clipboard-text="([A-Za-z0-9]{5})"/', $cc, $codeMatch);
    
$domain = $domainMatch[1] ?? '';
$code = $codeMatch[1] ?? '';
$cookieFile = "cookie.txt";


$linkInitUrl = "https://{$domain}link/process/";
echo "$linkInitUrl\n";
$payload = json_encode(["linkInit" => $code]);
echo "$payload\n";
$header = ["Content-Type: application/json"];
$start = cURL($linkInitUrl, 'POST', $payload, $cookieFile, $header);
$response = json_decode($start, true);
$ress = $response['message'] ?? '';
echo "$ress\n";


preg_match('/href="([^"]+)"/', $ress, $match);
$continuePath = $match[1] ?? '';
$continueUrl = "https://" . rtrim($domain, "/") . $continuePath;

$step1 = cURL($continueUrl, 'GET', null, $cookieFile, $header, $linkInitUrl);

//echo "$step1\n";
file_put_contents("step1.html", $step1);
preg_match(
    '/<input[^>]+id="pissoff"[^>]+value="([^"]+)"/', $step1, $pissoffMatch);
preg_match(
    '/<span[^>]+class="cnnc"[^>]+id="([^"]+)"/', $step1, $cnncMatch);
preg_match(
    '/<input[^>]+id="linkVer"[^>]+value="([^"]+)"/', $step1, $linkVerMatch);
preg_match(
    '/Step\s*-\s*(\d+)\s*\/\s*(\d+)/i', $step1, $stepMatch);
$pissoff   = $pissoffMatch[1] ?? '';
$cnnc      = $cnncMatch[1] ?? '';
$linkver   = $linkVerMatch[1] ?? '';
$stepNow   = $stepMatch[1] ?? '';
$stepTotal = $stepMatch[2] ?? '';
$i         = $stepNow !== '' ? intval($stepNow) - 1 : 0;
echo "pissoff : {$pissoff}\n";
echo "cnnc    : {$cnnc}\n";
echo "linkver : {$linkver}\n";
echo "STEP    : {$stepNow} / {$stepTotal}\n";

$timestamp = time();
if ($linkver === 'cc') {
    require_once (__DIR__ . "/payload/cc-payload.php");
    $payload = buildCcPayload($cnnc, $pissoff);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "\n";
} else {
    die;
}
sleep(20);
$header = ["Content-Type: application/json"];
$step2 = cURL($linkInitUrl, 'POST', json_encode($payload, JSON_UNESCAPED_SLASHES), $cookieFile, $header, $continueUrl);

echo "$step2\n";