<?php
    







function cURL($url, $method = 'GET', $postData = null, $cookieFile = null, $headers = [], $referer = '', $userAgent = 'Mozilla/5.0', $verbose = false) {
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
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_HTTPHEADER => array_merge($defaultHeaders, $headers),
    ]);
    if ($verbose) {
        $logFile = fopen("article.log", "a");
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_STDERR, $logFile);
    }
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
    if (isset($logFile) && is_resource($logFile)) {
        fclose($logFile);
    }
    return $response;
}


function captcha($CCContent, $jsUrl, $cookieFile = null) {
    global $apikey;

    preg_match(
        '/xhr\.open\("POST",\s*"([^"]+)"/', $CCContent, $postMatch);
    $endpoint = isset($postMatch[1]) ? "https://$jsUrl{$postMatch[1]}" : null;
    preg_match(
        '/<img\s+src="([^"]+)"/', $CCContent, $imgMatch);
    $imageUrl = isset($imgMatch[1]) ? "https://$jsUrl{$imgMatch[1]}" : null;
    $imageContent = cURL($imageUrl, 'GET', null, $cookieFile, [], "https://$jsUrl");
    file_put_contents("captcha.png", $imageContent);
    echo "Saved captcha.png\n";

    preg_match('/captchaData\s*=\s*\{\s*"options"\s*:\s*\[([^\]]+)\]/', $CCContent, $iconMatch);
    $iconsRaw = $iconMatch[1] ?? '';
    $icons = array_map(fn($i) => trim(trim($i), '"'), explode(',', $iconsRaw));

    preg_match('/xhr\.send\(\s*"([^"]+)"\s*\+\s*([a-zA-Z0-9_]+)\s*\)/', $CCContent, $match);
    if (!isset($match[1], $match[2])) {
        echo "invalid XHR Format\n";
        return;
    }
    parse_str($match[1], $payload);
    echo "option   =\n";
    foreach ($icons as $i => $icon) {
        echo "  [$i] $icon\n";
    }

    $imgData     = file_get_contents(__DIR__ . "/captcha.png");
    $base64Image = base64_encode($imgData);
    require_once(__DIR__ . "/captcha.php");
    getUserInfo($apikey);

    $solved = fa_iconSolver($apikey, $base64Image);
    //$answer = $solved['request'];

    $index = array_search($solved, $icons);
    if ($index === false) {
        echo "result not match\n";
        return;
    }

    $indexKey = array_search('', $payload, true);
    if ($indexKey !== false) {
        $payload[$indexKey] = $index;
    }
    unset($payload['iconIndex']);

    $body = http_build_query($payload);
    print_r($body);
    $response = cURL($endpoint, 'POST', $body, $cookieFile, [], "https://$jsUrl");

    //@unlink("captcha.png");
    file_put_contents('cc.json', $response, JSON_PRETTY_PRINT);
}


function captchaManual($CCContent, $jsUrl, $cookieFile = null) {
    preg_match('/xhr\.open\("POST",\s*"([^"]+)"/', $CCContent, $postMatch);
    $endpoint = isset($postMatch[1]) ? "https://$jsUrl{$postMatch[1]}" : null;
    preg_match('/<img\s+src="([^"]+)"/', $CCContent, $imgMatch);
    $imageUrl = isset($imgMatch[1]) ? "https://$jsUrl{$imgMatch[1]}" : null;
    $imageContent = cURL($imageUrl, 'GET', null, $cookieFile, [], "https://$jsUrl");
    file_put_contents("captcha.png", $imageContent);
    echo "Saved captcha.png\n";
    preg_match('/captchaData\s*=\s*\{\s*"options"\s*:\s*\[([^\]]+)\]/', $CCContent, $iconMatch);
    $iconsRaw = isset($iconMatch[1]) ? $iconMatch[1] : '';
    $icons = array_map(fn($i) => trim(trim($i), '"'), explode(',', $iconsRaw));
    preg_match('/xhr\.send\(\s*"([^"]+)"\s*\+\s*([a-zA-Z0-9_]+)\s*\)/', $CCContent, $match);
    if (!isset($match[1], $match[2])) {
        echo "invalid XHR Format\n";
        return;
    }
    parse_str($match[1], $payload);
    echo "option   =\n";
    foreach ($icons as $i => $icon) {
        echo "  [$i] $icon\n";
    }
    $index = readline("check ur captcha.png: ");
    //fa_iconSolve($apikey, $base64);
    $indexKey = null;
    foreach ($payload as $key => $value) {
        if ($value === '') {
            $indexKey = $key;
            break;
        }
    }
    $payload[$indexKey] = $index;
    unset($payload['iconIndex']);
    $body = http_build_query($payload);
    print_r($body);
    $response = cURL($endpoint, 'POST', $body, $cookieFile, [], "https://$jsUrl");
    @unlink("captcha.png");
    file_put_contents('cc.json', $response, JSON_PRETTY_PRINT);

}


function submit($js, $html, $json) {
    //system("clear");
    $js = file_get_contents($js);
    $html = file_get_contents($html);
    $json = file_get_contents($json);
    $response = json_decode($json, true);
    preg_match_all('/getElementById\("([^"]+)"\)/', $js, $idMatches);
    preg_match_all('/\.value\s*=\s*response\.([a-zA-Z0-9_]+);/', $js, $keyMatches);
    $mappedInputs = [];
    for ($i = 0; $i < min(count($idMatches[1]), count($keyMatches[1])); $i++) {
        $inputId = $idMatches[1][$i];
        $jsonKey = $keyMatches[1][$i];
        if (isset($response[$jsonKey])) {
            $mappedInputs[$inputId] = $response[$jsonKey];
        }
    }

    preg_match('/document\.querySelector\("([^"]+)"\)\.innerHTML\s*=\s*`/', $js, $containerMatch);
    $captchaTag = !empty($containerMatch[1]) ? $containerMatch[1] : null;

    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    $xpath = new DOMXPath($dom);
    $forms = $xpath->query('//form');

    $payload = [];

    foreach ($forms as $form) {
        if ($captchaTag) {
            $captchaElement = $xpath->query(".//$captchaTag", $form);
            if ($captchaElement->length > 0) {
                $inputs = $xpath->query('.//input', $form);
                foreach ($inputs as $input) {
                    $name = $input->getAttribute('name');
                    $value = $input->getAttribute('value');
                    $payload[$name] = $value;
                }
                foreach ($mappedInputs as $name => $value) {
                    $payload[$name] = $value;
                }
                break;
            }
        }
    }
    return http_build_query($payload);
}

function artikel() {
    $log = file_get_contents("article.log");
    preg_match_all('/< location: ([^\r\n]+)/i', $log, $matches);
    @unlink("article.log");
    if (!empty($matches[1])) {
        $last = end($matches[1]);
        echo "Location:\n  $last\n";
        return $last;
    } else {
        echo "Article not found\n";
        return null;
    }
}

$url = readline("shorthop: ");

$host = parse_url($url, PHP_URL_HOST) ?? '';
$path = parse_url($url, PHP_URL_PATH) ?? '';
echo "URL: $host\tID: $path\n";
$cookieFile = "cookie.txt";
$referer = $host;
$link = cURL($url, 'GET', null, $cookieFile, []);

if (preg_match('/location\.href\s*=\s*"([^"]+)"/', $link, $match)) {
    $redir1 = $match[1];
    $link = cURL($redir1, 'GET', null, $cookieFile, [], $referer);
    if (preg_match('/location\.href\s*=\s*[\'"]([^\'"]+)[\'"]/', $link, $match2)) {
        $redir2 = $match2[1];
        $jsUrl = parse_url($redir1, PHP_URL_HOST);
        // STEP 1
        $step1 = cURL($redir2, 'GET', null, $cookieFile, [], $referer, 'Mozilla/5.0', true);
        preg_match('/<h1[^>]*>\s*(STEP\s+\d+\/\d+)\s*<\/h1>/i', $step1, $stepPage);
        echo "\n" . $stepPage[1] . "\n";

        file_put_contents("step_1.html", $step1);
        preg_match('/src="\/sl\/([a-z0-9]+)\.js"/', $step1, $slJs);
        if (isset($slJs[1])) {
            $SLFile = "/sl/" . $slJs[1] . ".js";
            $FullSLurl = "https://$jsUrl$SLFile";
            $maxRetry = 10;
            $retryCount = 0;
            $SLContent = '';

            while ($retryCount < $maxRetry) {
                $SLContent = cURL($FullSLurl, 'GET', null, $cookieFile, [], "https://$jsUrl/");
                if (strlen($SLContent) > 100) {
                    break;
                }
                $retryCount++;
                sleep(1);
            }
            if (strlen($SLContent) > 100) {
                file_put_contents("step_1.sl", $SLContent);
                preg_match('/src\s*=\s*[\'"`](\/cc\/[\w\d]+\.js)\?onload=([\w\d]+)&action=captcha[\'"`]/', $SLContent, $ccJs);
                preg_match('/\?([a-f0-9]{32})=true/', $SLContent, $tokenMatch);
                preg_match('/data:\s*\{\s*([a-zA-Z0-9_]+)\s*:\s*1\s*\}/', $SLContent, $keyMatch);
                $key = $keyMatch[1];
                $validationToken = $tokenMatch[0];
                $validationUrl = "https://" . $jsUrl . $path . $validationToken;
                $validationPayload = [$key => 1];
                $validationResponse = cURL($validationUrl, 'POST', $validationPayload, $cookieFile, [], $jsUrl);
            } else {
                echo "Validation not found\n";
            }
            if (isset($tokenMatch[0])) {
                if (isset($ccJs[1])) {
                    $CCFile = $ccJs[1];
                    $CCLoader = $ccJs[2];
                    $FullCCurl = "https://$jsUrl$CCFile?onload=$CCLoader&action=captcha";
                    $CCContent = cURL($FullCCurl, 'GET', null, $cookieFile, [], "https://$jsUrl");
                    file_put_contents("step_1.cc", $CCContent);
                    captcha($CCContent, $jsUrl, $cookieFile);
                    $payload = submit("step_1.cc", "step_1.html", "cc.json");
                    $articleUrl = artikel();
                } else {
                    echo "CC.js not found\n";
                }
            } else {
                echo "Failed fetch SL.js \n";
            }
        }
    }
}

exit;

function bypass(&$articleUrl, &$payload, $cookieFile, $jsUrl, $path) {
    $html = cURL($articleUrl, 'POST', $payload, $cookieFile, [], $articleUrl, 'Mozilla/5.0', true);
    array_map('unlink', glob("step_*"));
    @unlink("cc.json");
    file_put_contents("step.html", $html);

    preg_match("/location\\.href=['\"]([^'\"]+)['\"]/", $html, $resultUrl);
    if (isset($resultUrl[1])) {
        echo "URL:\t  " . $resultUrl[1] . "\n";
        array_map('unlink', glob("step*"));
        @unlink("article.log");
        return true;
    }
    preg_match('/<h1[^>]*>\s*(STEP\s+\d+\/\d+)\s*<\/h1>/i', $html, $stepPage);
    echo "\n" . $stepPage[1] . "\n";
    
    preg_match('/src="\/sl\/([a-z0-9]+)\.js"/', $html, $slJs);
    if (!isset($slJs[1])) return false;

    $SLFile = "/sl/" . $slJs[1] . ".js";
    $SLContent = cURL("https://$jsUrl$SLFile", 'GET', null, $cookieFile, [], "https://$jsUrl/");
    file_put_contents("step.sl", $SLContent);
    preg_match('/\?([a-f0-9]{32})=true/', $SLContent, $tokenMatch);
    preg_match('/data:\s*\{\s*([a-zA-Z0-9_]+)\s*:\s*1\s*\}/', $SLContent, $keyMatch);
    if (isset($tokenMatch[0], $keyMatch[1])) {
        $validationUrl = "https://$jsUrl$path" . $tokenMatch[0];
        $validationPayload = [$keyMatch[1] => 1];
        cURL($validationUrl, 'POST', $validationPayload, $cookieFile, [], $jsUrl);
    }
    preg_match('/src\s*=\s*[\'"`](\/cc\/[\w\d]+\.js)\?onload=([\w\d]+)&action=captcha[\'"`]/', $SLContent, $ccJs);
    if (!isset($ccJs[1], $ccJs[2])) return false;
    $CCFile = $ccJs[1];
    $CCLoader = $ccJs[2];
    $CCContent = cURL("https://$jsUrl$CCFile?onload=$CCLoader&action=captcha", 'GET', null, $cookieFile, [], "https://$jsUrl");
    file_put_contents("step.cc", $CCContent);
    captcha($CCContent, $jsUrl, $cookieFile);

    $payload = submit("step.cc", "step.html", "cc.json");
    $articleUrl = artikel();
    return false;
}

while (true) {
    $done = bypass($articleUrl, $payload, $cookieFile, $jsUrl, $path);
    if ($done) {
        echo "Done!\n";
        break;
    }
}