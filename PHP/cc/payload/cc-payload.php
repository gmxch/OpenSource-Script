<?php
function generateRandomString($length) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $str = '';
    $bytes = random_bytes($length);
    for ($i = 0; $i < $length; $i++) {
        $str .= $chars[ord($bytes[$i]) % strlen($chars)];
    }
    return $str;
}

function hmac_sha256_bytes($key, $data) {
    return hash_hmac('sha256', $data, $key, true);
}


function buildCcPayload($cnnc, $pissoff) {
    $linkCont = random_int(12345, 54321);
    $response = generateRandomString(30);
    $ttl = generateRandomString(15);
    $u = time() + 587841;
    $key = $cnnc . 'WS5A2' . (9876789 - $linkCont) . 'PBK96';
    //$i = bin2hex(hmac_sha256_bytes($key, (string)$linkCont));
    $timestamp = time() - 835069; 
    $i = bin2hex(hmac_sha256_bytes($key, $timestamp . 'bEhInD' . $pissoff . 'YoU'));
    $c = bin2hex(hmac_sha256_bytes($key, $response));

    return [
        'linkCont' => $linkCont,
        'response' => $response,
        'i' => $i,
        'c' => $c,
        'u' => $u,
        //'pissoff' => $pissoff,
        'ttl' => $ttl
    ];
}