const DISPLAY_STATUS = true;
const USE_OBJECT_BASED_APPROACH = false;
const USE_AI_SERVICE = false;
const username = 'YOUR_PUTER_USER_NAME';
const password = 'YOUR_PUTER_PASSWORD';
;
;
!(async function () {
    ;
    let _0x44ad4e = document.createElement('div');
    function _0x3d86c7(_0x57ba35) {
        ;
        DISPLAY_STATUS && (_0x44ad4e.textContent = _0x57ba35);
    }
    async function _0x2658f2(_0x515799) {
        return await new Promise(_0x27fd31 => setTimeout(_0x27fd31, _0x515799));
    }
    if (DISPLAY_STATUS && (_0x44ad4e.setAttribute('id', 'statusBarCap'), _0x44ad4e.style.position = 'fixed', _0x44ad4e.style.left = '0', _0x44ad4e.style.top = '0', _0x44ad4e.style.width = '100%', _0x44ad4e.style.backgroundColor = 'rgba(0, 0, 0, 0.7)', _0x44ad4e.style.color = 'white', _0x44ad4e.style.fontSize = '16px', _0x44ad4e.style.textAlign = 'center', _0x44ad4e.style.padding = '10px 0', _0x44ad4e.style.zIndex = '9999'), window.location.href.includes('puter.com') && !GM_getValue('API_TOKEN')) {
        let _0x166c5e = setInterval(function () {
            ;
            let _0x1bdd2d = localStorage.getItem('auth_token');
            _0x1bdd2d && (GM_setValue('API_TOKEN', _0x1bdd2d), console.log('Token Saved'), clearInterval(_0x166c5e), window.close());
        }, 5000);
        return void setTimeout(function () {
            ;
            window.close();
        }, 120000);
    }
    var _0x680796 = false, _0x1a2598 = '#captcha_modal_body img', _0x49cdda = '#captcha_modal_body canvas';
    function _0x28186a(_0x39cbb4, _0x10c3cc, _0x4c856d) {
        ;
        let _0x53156f = _0x39cbb4, _0x2cfa3c = _0x10c3cc;
        const _0xe5227e = _0x4c856d.getBoundingClientRect(), _0x29041e = _0xe5227e.left + _0x53156f, _0x3b667b = _0xe5227e.top + _0x2cfa3c, _0x21dbef = new MouseEvent('mouseover', {
                'clientX': _0x29041e,
                'clientY': _0x3b667b,
                'bubbles': true,
                'cancelable': false,
                'view': unsafeWindow || window
            }), _0x2f1bfb = new MouseEvent('mousemove', {
                'clientX': _0x29041e,
                'clientY': _0x3b667b,
                'bubbles': true,
                'cancelable': false,
                'view': unsafeWindow || window
            }), _0x450a3f = new MouseEvent('click', {
                'clientX': _0x29041e,
                'clientY': _0x3b667b,
                'bubbles': true,
                'cancelable': false,
                'view': unsafeWindow || window
            });
        _0x4c856d.dispatchEvent(_0x21dbef);
        _0x4c856d.dispatchEvent(_0x2f1bfb);
        _0x4c856d.dispatchEvent(_0x450a3f);
        ;
    }
    function _0x22beff(_0x3aeb26, _0x1476fc, _0x4e214c, _0x596799, _0x2c3900) {
        const _0x188e83 = _0x2c3900.width / _0x4e214c, _0x558921 = _0x2c3900.height / _0x596799, _0xae6fbd = _0x1476fc * _0x188e83 + _0x188e83 / 2, _0xa7b2f8 = _0x3aeb26 * _0x558921 + _0x558921 / 2;
        let _0x297120 = _0x2c3900.getBoundingClientRect().left + _0xae6fbd + 4 * Math.random() - 2, _0x4c549a = _0x2c3900.getBoundingClientRect().top + _0xa7b2f8 + 4 * Math.random() - 2;
        const _0x2e90cc = new MouseEvent('mouseover', {
                'clientX': _0x297120,
                'clientY': _0x4c549a,
                'bubbles': true,
                'cancelable': false,
                'view': unsafeWindow || window
            }), _0x372ef9 = new MouseEvent('mousemove', {
                'clientX': _0x297120,
                'clientY': _0x4c549a,
                'bubbles': true,
                'cancelable': false,
                'view': unsafeWindow || window
            }), _0x1a06bf = new MouseEvent('click', {
                'clientX': _0x297120,
                'clientY': _0x4c549a,
                'bubbles': true,
                'cancelable': false,
                'view': unsafeWindow || window
            });
        _0x2c3900.dispatchEvent(_0x2e90cc);
        _0x2c3900.dispatchEvent(_0x372ef9);
        _0x2c3900.dispatchEvent(_0x1a06bf);
        ;
    }
    function _0x412559(_0x2d4396, _0x7c96e2, _0x4bdb8c, _0x21d93e) {
        const _0x56a24e = function (_0x370008) {
                const _0x4eb732 = Math.max(3, Math.floor(6 * _0x370008)), _0x5e69a1 = Math.floor(_0x4eb732 / 2), _0x45e869 = [];
                let _0x2f4216 = 0;
                for (let _0x31b53f = -_0x5e69a1; _0x31b53f <= _0x5e69a1; _0x31b53f++) {
                    const _0x6e6a73 = Math.exp(-_0x31b53f * _0x31b53f / (2 * _0x370008 * _0x370008));
                    _0x45e869.push(_0x6e6a73);
                    _0x2f4216 += _0x6e6a73;
                    ;
                }
                return _0x45e869.map(_0x187e79 => _0x187e79 / _0x2f4216);
            }(_0x21d93e), _0x1aeea5 = Math.floor(_0x56a24e.length / 2), _0x34909a = new Float32Array(_0x7c96e2 * _0x4bdb8c), _0x5d3e51 = new Uint8ClampedArray(_0x7c96e2 * _0x4bdb8c);
        for (let _0x1ec3cf = 0; _0x1ec3cf < _0x4bdb8c; _0x1ec3cf++) {
            for (let _0x283ea3 = 0; _0x283ea3 < _0x7c96e2; _0x283ea3++) {
                let _0xec6ecf = 0;
                for (let _0x29e740 = -_0x1aeea5; _0x29e740 <= _0x1aeea5; _0x29e740++) {
                    _0xec6ecf += _0x2d4396[_0x1ec3cf * _0x7c96e2 + Math.min(_0x7c96e2 - 1, Math.max(0, _0x283ea3 + _0x29e740))] * _0x56a24e[_0x29e740 + _0x1aeea5];
                }
                _0x34909a[_0x1ec3cf * _0x7c96e2 + _0x283ea3] = _0xec6ecf;
            }
        }
        for (let _0x1d4bf3 = 0; _0x1d4bf3 < _0x4bdb8c; _0x1d4bf3++) {
            for (let _0x4e405e = 0; _0x4e405e < _0x7c96e2; _0x4e405e++) {
                let _0x59cad3 = 0;
                for (let _0x50a057 = -_0x1aeea5; _0x50a057 <= _0x1aeea5; _0x50a057++) {
                    _0x59cad3 += _0x34909a[Math.min(_0x4bdb8c - 1, Math.max(0, _0x1d4bf3 + _0x50a057)) * _0x7c96e2 + _0x4e405e] * _0x56a24e[_0x50a057 + _0x1aeea5];
                }
                _0x5d3e51[_0x1d4bf3 * _0x7c96e2 + _0x4e405e] = _0x59cad3;
            }
        }
        return _0x5d3e51;
    }
    async function _0x1edc5f(_0x428672, _0x2df8b4) {
        ;
        let _0x5f6be9 = null, _0x743bdc = null, _0x39a7ec = [], _0x5ad3a4 = [];
        function _0x3b2390(_0x1462d0) {
            return new Promise((_0x2abea8, _0x73f9eb) => {
                const _0x147fde = new Image();
                _0x147fde.onload = () => {
                    const _0x1b098c = document.createElement('canvas');
                    _0x1b098c.width = _0x147fde.width;
                    _0x1b098c.height = _0x147fde.height;
                    ;
                    const _0x195e10 = _0x1b098c.getContext('2d');
                    _0x195e10.drawImage(_0x147fde, 0, 0);
                    const _0x34ee1a = _0x195e10.getImageData(0, 0, _0x147fde.width, _0x147fde.height);
                    _0x2abea8(_0x34ee1a);
                };
                _0x147fde.onerror = () => _0x73f9eb(new Error('Failed to load image from dataURI'));
                _0x147fde.src = _0x1462d0;
                ;
            });
        }
        function _0xd93e50(_0x183510, _0x57e6ca, _0x5a5d9d, _0x2a75da) {
            ;
            for (let _0x326f6b = 1; _0x326f6b < _0x2a75da; _0x326f6b++) {
                const _0x5a4f70 = Math.floor(_0x57e6ca * _0x326f6b / _0x2a75da);
                for (let _0x42a3df = 0; _0x42a3df < _0x5a5d9d; _0x42a3df++) {
                    if (_0x183510.has(_0x5a4f70 + ',' + _0x42a3df) || _0x183510.has(_0x5a4f70 + 1 + ',' + _0x42a3df) || _0x183510.has(_0x5a4f70 - 1 + ',' + _0x42a3df)) {
                        return true;
                    }
                }
            }
            return false;
        }
        function _0x5bec68(_0x2064d5, _0x128c0c) {
            ;
            let _0x58cd05 = 0, _0x465c38 = 0, _0x4eff57 = 0;
            for (let _0x5b9b0b = 0; _0x5b9b0b < _0x2064d5.length; _0x5b9b0b++) {
                _0x58cd05 += _0x2064d5[_0x5b9b0b] * _0x128c0c[_0x5b9b0b];
                _0x465c38 += _0x2064d5[_0x5b9b0b] * _0x2064d5[_0x5b9b0b];
                _0x4eff57 += _0x128c0c[_0x5b9b0b] * _0x128c0c[_0x5b9b0b];
                ;
            }
            return _0x58cd05 / (Math.sqrt(_0x465c38) * Math.sqrt(_0x4eff57) || 1);
        }
        function _0x4b9726(_0x4ec372, _0x31aed4, _0x2b2368, _0xcc6fe5, _0x59e33d, _0x5c06f9) {
            const _0x2c19c1 = new Set();
            for (let _0x33c355 = _0xcc6fe5; _0x33c355 <= _0x59e33d; _0x33c355++) {
                for (let _0x8798d8 = _0x31aed4; _0x8798d8 <= _0x2b2368; _0x8798d8++) {
                    if (_0x8798d8 === _0x31aed4 || _0x8798d8 === _0x2b2368 || _0x33c355 === _0xcc6fe5 || _0x33c355 === _0x59e33d) {
                        const _0xfdf512 = 4 * (_0x33c355 * _0x5c06f9 + _0x8798d8), _0x4ef623 = _0x4ec372.data[_0xfdf512] + ',' + _0x4ec372.data[_0xfdf512 + 1] + ',' + _0x4ec372.data[_0xfdf512 + 2];
                        _0x2c19c1.add(_0x4ef623);
                    }
                }
            }
            const _0x37c48b = [];
            for (let _0x1d34a5 = _0xcc6fe5; _0x1d34a5 <= _0x59e33d; _0x1d34a5++) {
                for (let _0x19b8ef = _0x31aed4; _0x19b8ef <= _0x2b2368; _0x19b8ef++) {
                    const _0x501fc9 = 4 * (_0x1d34a5 * _0x5c06f9 + _0x19b8ef), _0x5750e4 = _0x4ec372.data[_0x501fc9] + ',' + _0x4ec372.data[_0x501fc9 + 1] + ',' + _0x4ec372.data[_0x501fc9 + 2];
                    _0x2c19c1.has(_0x5750e4) || _0x37c48b.push([
                        _0x4ec372.data[_0x501fc9],
                        _0x4ec372.data[_0x501fc9 + 1],
                        _0x4ec372.data[_0x501fc9 + 2]
                    ]);
                }
            }
            if (0 === _0x37c48b.length) {
                console.log('Warning: No pixels remain after filtering edge RGBs, using all pixels in division');
                for (let _0x41ad35 = _0xcc6fe5; _0x41ad35 <= _0x59e33d; _0x41ad35++) {
                    for (let _0x72fd5 = _0x31aed4; _0x72fd5 <= _0x2b2368; _0x72fd5++) {
                        const _0x3fdc3a = 4 * (_0x41ad35 * _0x5c06f9 + _0x72fd5);
                        _0x37c48b.push([
                            _0x4ec372.data[_0x3fdc3a],
                            _0x4ec372.data[_0x3fdc3a + 1],
                            _0x4ec372.data[_0x3fdc3a + 2]
                        ]);
                    }
                }
            }
            const _0x73aeb2 = function (_0x32138f, _0x4fef8c = 8) {
                const _0x1f130f = new Array(_0x4fef8c * _0x4fef8c * _0x4fef8c).fill(0);
                for (const [_0x81f760, _0x4ab5aa, _0x336e21] of _0x32138f)
                    _0x1f130f[Math.floor(_0x81f760 / (256 / _0x4fef8c)) * _0x4fef8c * _0x4fef8c + Math.floor(_0x4ab5aa / (256 / _0x4fef8c)) * _0x4fef8c + Math.floor(_0x336e21 / (256 / _0x4fef8c))]++;
                const _0x4b778b = _0x32138f.length || 1;
                return _0x1f130f.map(_0x563a7d => _0x563a7d / _0x4b778b);
            }(_0x37c48b, 8);
            return _0x73aeb2;
        }
        try {
            return _0x5f6be9 = await _0x3b2390(_0x428672), _0x743bdc = await _0x3b2390(_0x2df8b4), _0x39a7ec = function (_0x18fd22) {
                const _0x25d736 = _0x18fd22.width, _0x6db3e0 = _0x18fd22.height;
                let _0xea3fc7 = function (_0x59c7be) {
                    const _0x5286b8 = new Uint8ClampedArray(_0x59c7be.width * _0x59c7be.height);
                    for (let _0x5c84fc = 0; _0x5c84fc < _0x5286b8.length; _0x5c84fc++) {
                        const _0x45c1e8 = _0x59c7be.data[4 * _0x5c84fc], _0x4fce9e = _0x59c7be.data[4 * _0x5c84fc + 1], _0x40312c = _0x59c7be.data[4 * _0x5c84fc + 2];
                        _0x5286b8[_0x5c84fc] = (_0x45c1e8 + _0x4fce9e + _0x40312c) / 3;
                    }
                    return _0x5286b8;
                }(_0x18fd22);
                _0xea3fc7 = _0x412559(_0xea3fc7, _0x25d736, _0x6db3e0, 1);
                const _0x3d4137 = function (_0x3fe578, _0x43435a, _0x448d37) {
                    const _0x100ec7 = new Set();
                    for (let _0x1be6a7 = 0; _0x1be6a7 < _0x448d37; _0x1be6a7++) {
                        for (let _0x47fb60 = 0; _0x47fb60 < _0x43435a; _0x47fb60++) {
                            255 === _0x3fe578[_0x1be6a7 * _0x43435a + _0x47fb60] && _0x100ec7.add(_0x47fb60 + ',' + _0x1be6a7);
                        }
                    }
                    return _0x100ec7;
                }(function (_0x3154fe, _0x25e634, _0x5ada75) {
                    const _0x557d2f = [
                            -1,
                            0,
                            1,
                            -2,
                            0,
                            2,
                            -1,
                            0,
                            1
                        ], _0x1e133c = [
                            -1,
                            -2,
                            -1,
                            0,
                            0,
                            0,
                            1,
                            2,
                            1
                        ], _0x2d0b73 = new Float32Array(_0x25e634 * _0x5ada75);
                    let _0xd86de8 = 0;
                    for (let _0xce9a85 = 1; _0xce9a85 < _0x5ada75 - 1; _0xce9a85++) {
                        for (let _0x13dd83 = 1; _0x13dd83 < _0x25e634 - 1; _0x13dd83++) {
                            let _0x50e4fa = 0, _0x6b3a7b = 0, _0x223213 = 0;
                            for (let _0x25ecca = -1; _0x25ecca <= 1; _0x25ecca++) {
                                for (let _0x3dea86 = -1; _0x3dea86 <= 1; _0x3dea86++) {
                                    const _0xa97822 = _0x3154fe[(_0xce9a85 + _0x25ecca) * _0x25e634 + (_0x13dd83 + _0x3dea86)];
                                    _0x50e4fa += _0x557d2f[_0x223213] * _0xa97822;
                                    _0x6b3a7b += _0x1e133c[_0x223213] * _0xa97822;
                                    _0x223213++;
                                    ;
                                }
                            }
                            const _0x2b4544 = Math.sqrt(_0x50e4fa * _0x50e4fa + _0x6b3a7b * _0x6b3a7b);
                            _0x2d0b73[_0xce9a85 * _0x25e634 + _0x13dd83] = _0x2b4544;
                            _0x2b4544 > _0xd86de8 && (_0xd86de8 = _0x2b4544);
                            ;
                        }
                    }
                    const _0x2524bb = 0.2 * _0xd86de8, _0x469e30 = new Uint8ClampedArray(_0x25e634 * _0x5ada75);
                    for (let _0x5ed3bb = 1; _0x5ed3bb < _0x5ada75 - 1; _0x5ed3bb++) {
                        for (let _0x2946be = 1; _0x2946be < _0x25e634 - 1; _0x2946be++) {
                            _0x469e30[_0x5ed3bb * _0x25e634 + _0x2946be] = _0x2d0b73[_0x5ed3bb * _0x25e634 + _0x2946be] > _0x2524bb ? 255 : 0;
                        }
                    }
                    return _0x469e30;
                }(_0xea3fc7, _0x25d736, _0x6db3e0), _0x25d736, _0x6db3e0);
                let _0x5c1820 = 3;
                _0xd93e50(_0x3d4137, _0x25d736, _0x6db3e0, 3) && (_0xd93e50(_0x3d4137, _0x25d736, _0x6db3e0, 4) || (_0x5c1820 = 4));
                const _0x3278e3 = [], _0x24f48a = Math.floor(_0x25d736 / _0x5c1820);
                for (let _0x2a8045 = 0; _0x2a8045 < _0x5c1820; _0x2a8045++) {
                    const _0x4db115 = _0x2a8045 * _0x24f48a, _0x2ccd8e = _0x2a8045 === _0x5c1820 - 1 ? _0x25d736 - 1 : (_0x2a8045 + 1) * _0x24f48a - 1, _0x5573aa = 0, _0x490d70 = _0x6db3e0 - 1, _0x3fe7f2 = (_0x4db115 + _0x2ccd8e) / 2, _0x17c9b3 = _0x6db3e0 / 2, _0x4dbb58 = _0x4b9726(_0x18fd22, _0x4db115, _0x2ccd8e, _0x5573aa, _0x490d70, _0x25d736);
                    _0x3278e3.push({
                        'bbox': {
                            'minX': _0x4db115,
                            'maxX': _0x2ccd8e,
                            'minY': _0x5573aa,
                            'maxY': _0x490d70
                        },
                        'centroid': {
                            'x': _0x3fe7f2,
                            'y': _0x17c9b3
                        },
                        'colorHistogram': _0x4dbb58
                    });
                }
                return _0x3278e3;
            }(_0x5f6be9), _0x5ad3a4 = function (_0x1289d7) {
                const _0x4faaf0 = _0x1289d7.width, _0x338776 = _0x1289d7.height, _0x36461a = [], _0xbc1fa2 = Math.floor(_0x4faaf0 / 3), _0x55a2c5 = Math.floor(_0x338776 / 2);
                for (let _0x571691 = 0; _0x571691 < 2; _0x571691++) {
                    for (let _0x3f901c = 0; _0x3f901c < 3; _0x3f901c++) {
                        const _0x303d24 = _0x3f901c * _0xbc1fa2, _0x4521ac = 2 === _0x3f901c ? _0x4faaf0 - 1 : (_0x3f901c + 1) * _0xbc1fa2 - 1, _0x146abe = _0x571691 * _0x55a2c5, _0x3202e2 = 1 === _0x571691 ? _0x338776 - 1 : (_0x571691 + 1) * _0x55a2c5 - 1, _0x29585b = (_0x303d24 + _0x4521ac) / 2, _0x8bff66 = (_0x146abe + _0x3202e2) / 2, _0xf66663 = _0x4b9726(_0x1289d7, _0x303d24, _0x4521ac, _0x146abe, _0x3202e2, _0x4faaf0);
                        _0x36461a.push({
                            'bbox': {
                                'minX': _0x303d24,
                                'maxX': _0x4521ac,
                                'minY': _0x146abe,
                                'maxY': _0x3202e2
                            },
                            'centroid': {
                                'x': _0x29585b,
                                'y': _0x8bff66
                            },
                            'colorHistogram': _0xf66663
                        });
                    }
                }
                return _0x36461a;
            }(_0x743bdc), function (_0x349e27, _0x5c07ae) {
                const _0x489360 = [], _0x478aca = new Set();
                for (let _0x21c515 = 0; _0x21c515 < _0x349e27.length; _0x21c515++) {
                    const _0x5c9487 = _0x349e27[_0x21c515];
                    let _0x132a3 = -1e+400, _0x1de45a = -1;
                    _0x5c07ae.forEach((_0x3f3020, _0x29aa63) => {
                        ;
                        if (!_0x478aca.has(_0x29aa63)) {
                            const _0x1f382f = _0x5bec68(_0x5c9487.colorHistogram, _0x3f3020.colorHistogram);
                            if (_0x1f382f > _0x132a3) {
                                _0x132a3 = _0x1f382f;
                                _0x1de45a = _0x29aa63;
                            }
                        }
                    });
                    -1 !== _0x1de45a ? (_0x489360.push({
                        'qIndex': _0x21c515,
                        'oIndex': _0x1de45a,
                        'similarity': _0x132a3,
                        'centroid': _0x5c07ae[_0x1de45a].centroid
                    }), _0x478aca.add(_0x1de45a)) : console.log('No match found for Question Division ' + (_0x21c515 + 1));
                    ;
                }
                return _0x489360.sort((_0x5efd08, _0x417fe3) => _0x5efd08.qIndex - _0x417fe3.qIndex), _0x489360.map(_0x1ac395 => ({
                    'x': Math.round(_0x1ac395.centroid.x),
                    'y': Math.round(_0x1ac395.centroid.y)
                }));
            }(_0x39a7ec, _0x5ad3a4);
        } catch (_0x43f9c2) {
            return console.error('Error processing images:', _0x43f9c2), [];
        }
    }
    async function _0x310be5(_0x7f75c0, _0x1816af, _0x2e5a44) {
        const _0xfffcd7 = document.createElement('canvas'), _0x2e1f8c = _0xfffcd7.getContext('2d'), _0x1cfe29 = document.createElement('canvas'), _0x1513ac = _0x1cfe29.getContext('2d');
        let _0x3c27f8 = null, _0xed50e1 = null, _0x376cdb = [], _0x33fbfa = [];
        const _0x1acac6 = new Image();
        function _0x459e1a(_0x53994f) {
            const _0x4a8139 = new Uint8ClampedArray(_0x53994f.width * _0x53994f.height);
            for (let _0x97f529 = 0; _0x97f529 < _0x4a8139.length; _0x97f529++) {
                const _0x48602d = _0x53994f.data[4 * _0x97f529], _0x589f7b = _0x53994f.data[4 * _0x97f529 + 1], _0xd8a0f8 = _0x53994f.data[4 * _0x97f529 + 2];
                _0x4a8139[_0x97f529] = (_0x48602d + _0x589f7b + _0xd8a0f8) / 3;
            }
            return _0x4a8139;
        }
        function _0x18be62(_0x123425, _0x90fbd, _0x1916b0) {
            const _0x4c2155 = [
                    -1,
                    0,
                    1,
                    -2,
                    0,
                    2,
                    -1,
                    0,
                    1
                ], _0x3071c3 = [
                    -1,
                    -2,
                    -1,
                    0,
                    0,
                    0,
                    1,
                    2,
                    1
                ], _0x410970 = new Uint8ClampedArray(_0x90fbd * _0x1916b0);
            for (let _0x354745 = 1; _0x354745 < _0x1916b0 - 1; _0x354745++) {
                for (let _0x35e12f = 1; _0x35e12f < _0x90fbd - 1; _0x35e12f++) {
                    let _0x566ac6 = 0, _0x528271 = 0, _0x4b94ec = 0;
                    for (let _0x4ce7ad = -1; _0x4ce7ad <= 1; _0x4ce7ad++) {
                        for (let _0x8ceca4 = -1; _0x8ceca4 <= 1; _0x8ceca4++) {
                            const _0x28ac88 = _0x123425[(_0x354745 + _0x4ce7ad) * _0x90fbd + (_0x35e12f + _0x8ceca4)];
                            _0x566ac6 += _0x4c2155[_0x4b94ec] * _0x28ac88;
                            _0x528271 += _0x3071c3[_0x4b94ec] * _0x28ac88;
                            _0x4b94ec++;
                            ;
                        }
                    }
                    const _0x1e73e2 = Math.sqrt(_0x566ac6 * _0x566ac6 + _0x528271 * _0x528271);
                    _0x410970[_0x354745 * _0x90fbd + _0x35e12f] = _0x1e73e2 > 100 ? 255 : 0;
                }
            }
            return _0x410970;
        }
        function _0x2c8308(_0x5009ac, _0xf6cb75, _0xe1e524, _0x5bd16b) {
            const _0x345dda = new Uint8Array(_0xf6cb75 * _0xe1e524), _0x194625 = [], _0x522944 = [
                    [
                        1,
                        0
                    ],
                    [
                        -1,
                        0
                    ],
                    [
                        0,
                        1
                    ],
                    [
                        0,
                        -1
                    ]
                ];
            function _0x3c0b7d(_0x25785b, _0x3e429f) {
                ;
                return _0x25785b >= 0 && _0x3e429f >= 0 && _0x25785b < _0xf6cb75 && _0x3e429f < _0xe1e524;
            }
            for (let _0x46aef2 = 0; _0x46aef2 < _0xe1e524; _0x46aef2++) {
                for (let _0x46350d = 0; _0x46350d < _0xf6cb75; _0x46350d++) {
                    const _0x3396e1 = _0x46aef2 * _0xf6cb75 + _0x46350d;
                    if (255 === _0x5009ac[_0x3396e1] && !_0x345dda[_0x3396e1]) {
                        const _0xc0b033 = [[
                                    _0x46350d,
                                    _0x46aef2
                                ]], _0x18a068 = [];
                        let _0x3fb6e6 = _0x46350d, _0x259e59 = _0x46350d, _0x15ef51 = _0x46aef2, _0x21f39b = _0x46aef2, _0x2212c3 = 0, _0x29bd8b = 0, _0x415426 = 0, _0x50cbbe = 0;
                        for (_0x345dda[_0x3396e1] = 1; _0xc0b033.length > 0;) {
                            const [_0x23990b, _0x11fc19] = _0xc0b033.pop();
                            _0x18a068.push([
                                _0x23990b,
                                _0x11fc19
                            ]);
                            _0x3fb6e6 = Math.min(_0x3fb6e6, _0x23990b);
                            _0x259e59 = Math.max(_0x259e59, _0x23990b);
                            _0x15ef51 = Math.min(_0x15ef51, _0x11fc19);
                            _0x21f39b = Math.max(_0x21f39b, _0x11fc19);
                            ;
                            for (let _0x439c84 = -1; _0x439c84 <= 1; _0x439c84++) {
                                for (let _0x3a79d5 = -1; _0x3a79d5 <= 1; _0x3a79d5++) {
                                    const _0x1d2e63 = _0x23990b + _0x3a79d5, _0x994528 = _0x11fc19 + _0x439c84;
                                    if (_0x3c0b7d(_0x1d2e63, _0x994528) && !_0x345dda[_0x994528 * _0xf6cb75 + _0x1d2e63]) {
                                        const _0x2155d3 = 4 * (_0x994528 * _0xf6cb75 + _0x1d2e63);
                                        _0x2212c3 += _0x5bd16b.data[_0x2155d3];
                                        _0x29bd8b += _0x5bd16b.data[_0x2155d3 + 1];
                                        _0x415426 += _0x5bd16b.data[_0x2155d3 + 2];
                                        _0x50cbbe++;
                                        ;
                                    }
                                }
                            }
                            for (const [_0xdffc62, _0x382fad] of _0x522944) {
                                const _0x2363e0 = _0x23990b + _0xdffc62, _0x27eadf = _0x11fc19 + _0x382fad, _0x10c4d5 = _0x27eadf * _0xf6cb75 + _0x2363e0;
                                _0x3c0b7d(_0x2363e0, _0x27eadf) && 255 === _0x5009ac[_0x10c4d5] && !_0x345dda[_0x10c4d5] && (_0x345dda[_0x10c4d5] = 1, _0xc0b033.push([
                                    _0x2363e0,
                                    _0x27eadf
                                ]));
                            }
                        }
                        const _0x4ea911 = _0x18a068.length;
                        if (_0x4ea911 >= 500 && _0x4ea911 <= 10000) {
                            const _0xa34334 = _0x18a068.reduce((_0x26677a, [_0x6c42ad]) => _0x26677a + _0x6c42ad, 0) / _0x18a068.length, _0x141a65 = _0x18a068.reduce((_0xe13d8, [, _0x2fb9c5]) => _0xe13d8 + _0x2fb9c5, 0) / _0x18a068.length, _0x3dae5d = _0x50cbbe > 0 ? {
                                    'r': _0x2212c3 / _0x50cbbe,
                                    'g': _0x29bd8b / _0x50cbbe,
                                    'b': _0x415426 / _0x50cbbe
                                } : {
                                    'r': 0,
                                    'g': 0,
                                    'b': 0
                                };
                            _0x194625.push({
                                'points': _0x18a068,
                                'area': _0x4ea911,
                                'bbox': {
                                    'minX': _0x3fb6e6,
                                    'maxX': _0x259e59,
                                    'minY': _0x15ef51,
                                    'maxY': _0x21f39b
                                },
                                'centroid': {
                                    'x': _0xa34334,
                                    'y': _0x141a65
                                },
                                'avgColor': _0x3dae5d
                            });
                        }
                    }
                }
            }
            return _0x194625;
        }
        _0x1acac6.onload = () => {
            ;
            _0xfffcd7.width = _0x1acac6.width;
            _0xfffcd7.height = _0x1acac6.height;
            _0x2e1f8c.drawImage(_0x1acac6, 0, 0);
            _0x3c27f8 = _0x2e1f8c.getImageData(0, 0, _0x1acac6.width, _0x1acac6.height);
            (function (_0x2bcd55) {
                const _0x387153 = _0x3c27f8, _0x2004a8 = _0x459e1a(_0x387153), _0xac0902 = _0x18be62(_0x412559(_0x2004a8, _0x387153.width, _0x387153.height, 1), _0x387153.width, _0x387153.height);
                _0x376cdb = _0x2c8308(_0xac0902, _0x387153.width, _0x387153.height, _0x3c27f8);
                _0x376cdb.sort((_0x4fdfba, _0xd72fd3) => _0x4fdfba.centroid.x - _0xd72fd3.centroid.x);
                _0x2bcd55();
                ;
            }(() => {
                const _0x1f0e28 = new Image();
                _0x1f0e28.onload = () => {
                    ;
                    _0x1cfe29.width = _0x1f0e28.width;
                    _0x1cfe29.height = _0x1f0e28.height;
                    _0x1513ac.drawImage(_0x1f0e28, 0, 0);
                    _0xed50e1 = _0x1513ac.getImageData(0, 0, _0x1f0e28.width, _0x1f0e28.height);
                    (function (_0x526fa2) {
                        const _0x527486 = _0xed50e1, _0x314c17 = _0x459e1a(_0x527486), _0x455f7f = _0x18be62(_0x412559(_0x314c17, _0x527486.width, _0x527486.height, 1), _0x527486.width, _0x527486.height);
                        _0x33fbfa = _0x2c8308(_0x455f7f, _0x527486.width, _0x527486.height, _0xed50e1);
                        _0x526fa2();
                        ;
                    }(() => {
                        const _0x1d4695 = (function () {
                            const _0x308dfb = [], _0x543b8f = new Set(), _0x1b4b98 = [];
                            return _0x376cdb.forEach((_0xf881a5, _0x11cdaf) => {
                                ;
                                let _0x20ac32 = 1e+400, _0x3d6cf0 = -1;
                                if (_0x33fbfa.forEach((_0x4bab0d, _0x31b3ac) => {
                                        ;
                                        if (!_0x543b8f.has(_0x31b3ac)) {
                                            const _0x3a7ae9 = (_0x32619f = _0xf881a5.avgColor, _0x149012 = _0x4bab0d.avgColor, Math.sqrt((_0x32619f.r - _0x149012.r) ** 2 + (_0x32619f.g - _0x149012.g) ** 2 + (_0x32619f.b - _0x149012.b) ** 2));
                                            if (_0x3a7ae9 < _0x20ac32) {
                                                _0x20ac32 = _0x3a7ae9;
                                                _0x3d6cf0 = _0x31b3ac;
                                            }
                                        }
                                        var _0x32619f, _0x149012;
                                    }), -1 !== _0x3d6cf0) {
                                    _0x308dfb.push({
                                        'qIndex': _0x11cdaf,
                                        'oIndex': _0x3d6cf0,
                                        'diff': _0x20ac32
                                    });
                                    _0x543b8f.add(_0x3d6cf0);
                                    ;
                                    const _0xeda64e = _0x33fbfa[_0x3d6cf0];
                                    _0x1b4b98.push({
                                        'x': Math.round(_0xeda64e.centroid.x),
                                        'y': Math.round(_0xeda64e.centroid.y)
                                    });
                                }
                            }), _0x1b4b98;
                        }());
                        _0x2e5a44(_0x1d4695);
                    }));
                    ;
                };
                _0x1f0e28.src = _0x1816af;
                ;
            }));
            ;
        };
        _0x1acac6.src = _0x7f75c0;
        ;
    }
    let _0x1e13bc = 0, _0x47176e = setInterval(async function () {
            ;
            if (document.querySelector(_0x1a2598) && document.querySelector(_0x1a2598).src && document.querySelector(_0x49cdda)) {
                if (function (_0x2e465e) {
                        const _0x2bb196 = _0x2e465e.getContext('2d', { 'willReadFrequently': true }).getImageData(0, 0, _0x2e465e.width, _0x2e465e.height).data;
                        for (let _0x4efca8 = 3; _0x4efca8 < _0x2bb196.length; _0x4efca8 += 4) {
                            if (0 !== _0x2bb196[_0x4efca8]) {
                                return false;
                            }
                        }
                        return true;
                    }(document.querySelector(_0x49cdda))) {
                    return;
                }
                if (_0x1e13bc++, 1 == _0x1e13bc) {
                    if (!username) {
                        return alert('Puter Username is required!');
                    }
                    if (!password) {
                        return alert('Puter Password is required!');
                    }
                    if ((username.includes('YOUR_PUTER') || password.includes('YOUR_PUTER')) && !GM_getValue('API_TOKEN')) {
                        for (window.open('https://puter.com'); !GM_getValue('API_TOKEN');) {
                            await _0x2658f2(5000);
                        }
                    }
                    GM_getValue('API_TOKEN') || (console.log('API Token not found. Logging in...'), _0x680796 = true, (async function () {
                        ;
                        navigator.userAgent;
                        const _0x59517e = {
                            'username': username,
                            'password': password
                        };
                        GM_xmlhttpRequest({
                            'method': 'POST',
                            'url': 'https://puter.com/login',
                            'headers': {
                                'Accept': '*/*',
                                'Content-Type': 'application/json',
                                'Origin': 'https://puter.com',
                                'Referer': 'https://puter.com/'
                            },
                            'data': JSON.stringify(_0x59517e),
                            'onload': function (_0x38a9ff) {
                                ;
                                try {
                                    const _0x543952 = JSON.parse(_0x38a9ff.responseText);
                                    200 === _0x38a9ff.status && _0x543952.proceed && _0x543952.token ? (console.log('Login Successful'), GM_setValue('API_TOKEN', _0x543952.token), _0x680796 = false) : 200 === _0x38a9ff.status ? alert('Puter Login failed. Please check your credentials.') : alert('Puter Error: Received status code ' + _0x38a9ff.status);
                                } catch (_0x315d08) {
                                    alert('Puter::Failed to parse response: ' + _0x315d08);
                                }
                            },
                            'onerror': function (_0x5e8861) {
                                ;
                                alert('Puter::An error occurred: ' + _0x5e8861);
                            }
                        });
                    }()));
                }
                if (_0x680796) {
                    return;
                }
                clearInterval(_0x47176e);
                var _0xe96a94 = [];
                if (_0xe96a94.push(document.querySelector(_0x1a2598).src), _0xe96a94.push(document.querySelector(_0x49cdda).toDataURL()), GM_log('Solving..'), DISPLAY_STATUS && document.body.appendChild(_0x44ad4e), _0x3d86c7('Solving..'), !USE_AI_SERVICE) {
                    if (!USE_OBJECT_BASED_APPROACH) {
                        let _0x42187a = await _0x1edc5f(_0xe96a94[0], _0xe96a94[1]);
                        if (0 == _0x42187a.length) {
                            return console.log('Puzzle cannot be solved'), void _0x3d86c7('Puzzle cannot be solved');
                        }
                        for (const _0x4d260f of _0x42187a)
                            await _0x28186a(parseInt(_0x4d260f.x), parseInt(_0x4d260f.y), document.querySelector(_0x49cdda)), await _0x2658f2(1000);
                        return GM_log('Puzzle Solved'), void _0x3d86c7('Puzzle Solved');
                    }
                    return void _0x310be5(_0xe96a94[0], _0xe96a94[1], async _0x5accb8 => {
                        ;
                        if (0 == _0x5accb8.length) {
                            return console.log('Puzzle cannot be solved'), void _0x3d86c7('Puzzle cannot be solved');
                        }
                        for (const _0x166e48 of _0x5accb8)
                            await _0x28186a(parseInt(_0x166e48.x), parseInt(_0x166e48.y), document.querySelector(_0x49cdda)), await _0x2658f2(1000);
                        GM_log('Puzzle Solved');
                        _0x3d86c7('Puzzle Solved');
                        ;
                    });
                }
                let _0x103e5a = 'Given two images, the first (smaller) is the question image and the second (larger) is the answer image; do not resize the answer image;select objects from the answer image in the same order as in the question image. Return the result as a plain JSON array of objects like: [{rows: 2, "columns": 3}, {"x": 123, "y": 456}, ...]  where rows is the total number of rows and total number of columns considering the image being divided into grid of equal boxes,x is the row which starts with 1 and y is the column which starts with 1. Do not add json in the response.';
                ;
                !function (_0x21ee3c, _0xbb2288, _0x1586eb, _0x45cbef = {}, _0x3c9a08) {
                    const _0x38c1ca = _0x1586eb.map(_0x4171de => ({
                            'content': [
                                _0xbb2288,
                                { 'image_url': { 'url': _0x4171de } }
                            ]
                        })), _0xe16ad0 = {
                            'interface': 'puter-chat-completion',
                            'driver': 'openai-completion',
                            'test_mode': false,
                            'method': 'complete',
                            'args': {
                                'model': _0x45cbef.model || 'gpt-5-nano',
                                'top_p': _0x45cbef.top_p ?? 1,
                                'frequency_penalty': _0x45cbef.frequency_penalty ?? 0,
                                'presence_penalty': _0x45cbef.presence_penalty ?? 0,
                                'vision': true,
                                'messages': _0x38c1ca
                            }
                        };
                    GM_xmlhttpRequest({
                        'method': 'POST',
                        'url': 'https://api.puter.com/drivers/call',
                        'headers': {
                            'Accept': '*/*',
                            'Accept-Language': 'en-US,en;q=0.9',
                            'Authorization': 'Bearer ' + _0x21ee3c,
                            'Connection': 'keep-alive',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Origin': 'https://docs.puter.com',
                            'Referer': 'https://docs.puter.com/',
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        },
                        'data': JSON.stringify(_0xe16ad0),
                        'onload': function (_0x10d90a) {
                            ;
                            if (console.log(_0x10d90a), _0x10d90a.responseText.includes('usage-limited-chat')) {
                                return GM_log('Puter usage limit has been exceeded. Please try later.'), _0x3d86c7('Puter usage limit has been exceeded. Please try later.'), void console.error('Error:', _0x10d90a.status, _0x10d90a.responseText);
                            }
                            _0x10d90a.status >= 200 && _0x10d90a.status < 300 ? _0x3c9a08(JSON.parse(_0x10d90a.responseText)) : (GM_log('Puzzle cannot be Solved'), _0x3d86c7('Puzzle cannot be Solved'), console.error('Error:', _0x10d90a.status, _0x10d90a.responseText));
                        },
                        'onerror': function (_0x56dae1) {
                            ;
                            GM_log('Puzzle cannot be Solved');
                            _0x3d86c7('Puzzle cannot be Solved');
                            console.error('Request failed:', _0x56dae1);
                            ;
                        }
                    });
                }(GM_getValue('API_TOKEN'), _0x103e5a, _0xe96a94, _0x353de9, async function (_0x3e9f82) {
                    ;
                    let _0x4a50cb = _0x3e9f82.result.message.content;
                    Array.isArray(_0x4a50cb) && (_0x4a50cb = _0x4a50cb[0]);
                    _0x4a50cb = _0x4a50cb.replace(/'/g, '"');
                    ;
                    let _0x59b9c0 = JSON.parse(_0x4a50cb), _0x37bb63 = document.querySelector(_0x49cdda), _0x57ba3c = 0, _0x112305 = 0;
                    for (const _0x44a7b2 of _0x59b9c0)
                        if (_0x44a7b2.rows && _0x44a7b2.columns) {
                            _0x57ba3c = parseInt(_0x44a7b2.rows);
                            _0x112305 = parseInt(_0x44a7b2.columns);
                            ;
                        } else {
                            if (0 == _0x57ba3c || 0 == _0x112305) {
                                return console.log('Puzzle cannot be solved'), void _0x3d86c7('Puzzle cannot be solved');
                            }
                            _0x22beff(parseInt(_0x44a7b2.x) - 1, parseInt(_0x44a7b2.y) - 1, _0x112305, _0x57ba3c, _0x37bb63);
                            await _0x2658f2(1000);
                            ;
                        }
                    GM_log('Puzzle Solved');
                    _0x3d86c7('Puzzle Solved');
                    ;
                });
            }
        }, 5000);
}());
;