// ==UserScript==
// @name        Two Piece Puzzle Solver
// @namespace   Two Piece Puzzle Solver
// @match       https://geekgrove.net/*
// @match       https://vitalityvista.net/*
// @version     1.5
// @author      faucetSolver
// @noframes
// @grant        GM_log
// @description Solves Image having two puzzle pieces
// ==/UserScript==


const DISPLAY_STATUS = true;
const DELAY_AFTER_EACH_ROTATION = 50;
(function () {
    'use strict';
    let DisplayStatus = document.createElement('div');
    function _0x51cce4(_0x5e748) {
        DISPLAY_STATUS && (
            DisplayStatus.textContent = _0x5e748);
    }
    DISPLAY_STATUS && (
        DisplayStatus.setAttribute('id', 'statusBarCap'), DisplayStatus.style.position = 'fixed', DisplayStatus.style.left = '0', DisplayStatus.style.top = '0', DisplayStatus.style.width = '100%', DisplayStatus.style.backgroundColor = 'rgba(0, 0, 0, 0.7)', DisplayStatus.style.color = 'white', DisplayStatus.style.fontSize = '16px', DisplayStatus.style.textAlign = 'center', DisplayStatus.style.padding = '10px 0', DisplayStatus.style.zIndex = '9999');
    var _0x243bb7 = false, _0x2664e1 = false, _0x4bbd5f = false, _0x41701a = 0, _0x4e1087 = false, _0x273d08 = 0;
    function _0x35461f(_0x447b4c) {
        const {
                width: _0x1abfad,
                height: _0x27e492,
                data: _0x145415
            } = _0x447b4c, _0x5303a4 = new ImageData(_0x1abfad, _0x27e492);
        function _0x1a0ae9(_0x451dd5, _0x210b6f) {
            ;
            return _0x451dd5 < 0 || _0x210b6f < 0 || _0x451dd5 >= _0x1abfad || _0x210b6f >= _0x27e492 ? 0 : _0x145415[4 * (_0x210b6f * _0x1abfad + _0x451dd5) + 3];
        }
        for (let _0x2f4edf = 0; _0x2f4edf < _0x27e492; _0x2f4edf++) {
            for (let _0x176b00 = 0; _0x176b00 < _0x1abfad; _0x176b00++) {
                if (_0x1a0ae9(_0x176b00, _0x2f4edf) > 0) {
                    if ([
                            _0x1a0ae9(_0x176b00 - 1, _0x2f4edf),
                            _0x1a0ae9(_0x176b00 + 1, _0x2f4edf),
                            _0x1a0ae9(_0x176b00, _0x2f4edf - 1),
                            _0x1a0ae9(_0x176b00, _0x2f4edf + 1)
                        ].some(_0x55d85c => 0 === _0x55d85c)) {
                        const _0x451136 = 4 * (_0x2f4edf * _0x1abfad + _0x176b00);
                        _0x5303a4.data[_0x451136] = 255;
                        _0x5303a4.data[_0x451136 + 1] = 0;
                        _0x5303a4.data[_0x451136 + 2] = 0;
                        _0x5303a4.data[_0x451136 + 3] = 255;
                    }
                }
            }
        }
        return _0x5303a4.data;
    }
    function _0x4c9e36(_0x4ae902, _0x4b0ef4) {
        if (0 === _0x4b0ef4) {
            return _0x4ae902.data;
        }
        const _0x5b135f = _0x4ae902.data, _0x3c0d2f = _0x4ae902.width, _0x2a9fed = _0x4ae902.height, _0x23953c = function (_0x1fd805) {
                const _0x193c7c = parseInt(Math.max(3, 6 * _0x1fd805)), _0x1f4181 = Math.sqrt(2 * Math.PI) * _0x1fd805, _0xc503db = 2 * _0x1fd805 * _0x1fd805;
                let _0x1300e1 = 0;
                const _0x583897 = new Float32Array(_0x193c7c - !(1 & _0x193c7c)), _0x2fc789 = parseInt(_0x583897.length / 2);
                for (let _0x39fcc6 = 0, _0x29f783 = -_0x2fc789; _0x39fcc6 < _0x583897.length; _0x29f783++, _0x39fcc6++) {
                    _0x583897[_0x39fcc6] = Math.exp(-_0x29f783 * _0x29f783 / _0xc503db) / _0x1f4181;
                    _0x1300e1 += _0x583897[_0x39fcc6];
                }
                for (let _0x269f42 = 0; _0x269f42 < _0x583897.length; _0x269f42++) {
                    _0x583897[_0x269f42] /= _0x1300e1;
                }
                return _0x583897;
            }(_0x4b0ef4), _0x529a8d = _0x23953c.length, _0x1e0a4e = Math.floor(_0x529a8d / 2), _0x2f1839 = new Uint8ClampedArray(_0x5b135f.length), _0x325b27 = new Uint8ClampedArray(_0x5b135f.length);
        for (let _0xcfcfa4 = 0; _0xcfcfa4 < _0x2a9fed; _0xcfcfa4++) {
            for (let _0x58c25a = 0; _0x58c25a < _0x3c0d2f; _0x58c25a++) {
                let _0x41d0db = 0, _0xb215ae = 0, _0x34d0dc = 0, _0x4aaea6 = 0;
                for (let _0xd823c4 = 0; _0xd823c4 < _0x529a8d; _0xd823c4++) {
                    const _0x46d9d0 = 4 * (_0xcfcfa4 * _0x3c0d2f + Math.min(_0x3c0d2f - 1, Math.max(0, _0x58c25a - _0x1e0a4e + _0xd823c4))), _0x57ffa0 = _0x23953c[_0xd823c4];
                    _0x41d0db += _0x5b135f[_0x46d9d0] * _0x57ffa0;
                    _0xb215ae += _0x5b135f[_0x46d9d0 + 1] * _0x57ffa0;
                    _0x34d0dc += _0x5b135f[_0x46d9d0 + 2] * _0x57ffa0;
                    _0x4aaea6 += _0x5b135f[_0x46d9d0 + 3] * _0x57ffa0;
                }
                const _0x321728 = 4 * (_0xcfcfa4 * _0x3c0d2f + _0x58c25a);
                _0x2f1839[_0x321728] = _0x41d0db;
                _0x2f1839[_0x321728 + 1] = _0xb215ae;
                _0x2f1839[_0x321728 + 2] = _0x34d0dc;
                _0x2f1839[_0x321728 + 3] = _0x5b135f[_0x321728 + 3];
            }
        }
        for (let _0x266b6d = 0; _0x266b6d < _0x2a9fed; _0x266b6d++) {
            for (let _0x36c3b3 = 0; _0x36c3b3 < _0x3c0d2f; _0x36c3b3++) {
                let _0x5285b6 = 0, _0x42a880 = 0, _0x584de6 = 0, _0xf95c2b = 0;
                for (let _0x33f703 = 0; _0x33f703 < _0x529a8d; _0x33f703++) {
                    const _0x5a6215 = 4 * (Math.min(_0x2a9fed - 1, Math.max(0, _0x266b6d - _0x1e0a4e + _0x33f703)) * _0x3c0d2f + _0x36c3b3), _0x64f296 = _0x23953c[_0x33f703];
                    _0x5285b6 += _0x2f1839[_0x5a6215] * _0x64f296;
                    _0x42a880 += _0x2f1839[_0x5a6215 + 1] * _0x64f296;
                    _0x584de6 += _0x2f1839[_0x5a6215 + 2] * _0x64f296;
                    _0xf95c2b += _0x2f1839[_0x5a6215 + 3] * _0x64f296;
                }
                const _0x338b28 = 4 * (_0x266b6d * _0x3c0d2f + _0x36c3b3);
                _0x325b27[_0x338b28] = Math.round(_0x5285b6);
                _0x325b27[_0x338b28 + 1] = Math.round(_0x42a880);
                _0x325b27[_0x338b28 + 2] = Math.round(_0x584de6);
                _0x325b27[_0x338b28 + 3] = Math.round(_0xf95c2b);
            }
        }
        return _0x325b27;
    }
    function _0x58bf76(_0x564023) {
        const _0x4881e5 = [], _0x15c62e = _0x564023.width, _0xb7674f = _0x564023.height, _0x31fcd0 = _0x564023.data;
        for (let _0x1827d9 = 0; _0x1827d9 < _0xb7674f; _0x1827d9++) {
            for (let _0x310c80 = 0; _0x310c80 < _0x15c62e; _0x310c80++) {
                _0x31fcd0[4 * (_0x1827d9 * _0x15c62e + _0x310c80) + 3] > 200 && _0x4881e5.push({
                    'x': _0x310c80,
                    'y': _0x1827d9
                });
            }
        }
        return _0x4881e5;
    }
    function _0x266fc8(_0x103b93, _0x1cf168, _0x3590ed = 5, _0x2b732e = 0.1, _0x49f95d = 40) {
        const _0x4c82f9 = _0x103b93.width, _0x43f824 = _0x103b93.height, _0x30968a = new Uint8ClampedArray(_0x4c82f9 * _0x43f824), _0x366bc8 = new Uint8ClampedArray(_0x4c82f9 * _0x43f824), _0x1e61fd = _0x103b93.data, _0x30f3fa = _0x1cf168.data;
        for (let _0x53b293 = 0; _0x53b293 < _0x4c82f9 * _0x43f824; _0x53b293++) {
            const _0x18d688 = _0x1e61fd[4 * _0x53b293], _0x7b4494 = _0x1e61fd[4 * _0x53b293 + 1], _0x45b5ba = _0x1e61fd[4 * _0x53b293 + 2];
            _0x1e61fd[4 * _0x53b293 + 3] > 0 && _0x18d688 > 150 && _0x7b4494 < 100 && _0x45b5ba < 100 && (_0x30968a[_0x53b293] = 1);
            const _0x46515f = _0x30f3fa[4 * _0x53b293], _0x5591d2 = _0x30f3fa[4 * _0x53b293 + 1], _0x7f13b = _0x30f3fa[4 * _0x53b293 + 2];
            _0x30f3fa[4 * _0x53b293 + 3] > 0 && _0x5591d2 > 150 && _0x46515f < 100 && _0x7f13b < 100 && (_0x366bc8[_0x53b293] = 1);
        }
        let _0x56f023 = function (_0x3baeeb, _0x565c0a = 0.5) {
                const _0xafb5b3 = _0x3baeeb.width, _0x348f02 = _0x3baeeb.height, _0x314191 = _0x3baeeb.data, _0x2721d5 = new Uint8Array(_0xafb5b3 * _0x348f02);
                for (let _0x208857 = 0; _0x208857 < _0x348f02; _0x208857++) {
                    for (let _0x390aa5 = 0; _0x390aa5 < _0xafb5b3; _0x390aa5++) {
                        _0x314191[4 * (_0x208857 * _0xafb5b3 + _0x390aa5) + 3] > 0 && (_0x2721d5[_0x208857 * _0xafb5b3 + _0x390aa5] = 1);
                    }
                }
                const _0x49691e = new Uint8Array(_0xafb5b3 * _0x348f02), _0x451a44 = [];
                for (let _0x386c23 = 0; _0x386c23 < _0xafb5b3; _0x386c23++) {
                    const _0x1e88cc = _0x386c23, _0x36fde5 = (_0x348f02 - 1) * _0xafb5b3 + _0x386c23;
                    _0x2721d5[_0x1e88cc] || _0x49691e[_0x1e88cc] || (_0x49691e[_0x1e88cc] = 1, _0x451a44.push(_0x1e88cc));
                    _0x2721d5[_0x36fde5] || _0x49691e[_0x36fde5] || (_0x49691e[_0x36fde5] = 1, _0x451a44.push(_0x36fde5));
                    ;
                }
                for (let _0x254ac4 = 0; _0x254ac4 < _0x348f02; _0x254ac4++) {
                    const _0x3504b0 = _0x254ac4 * _0xafb5b3 + 0, _0xa35d5b = _0x254ac4 * _0xafb5b3 + (_0xafb5b3 - 1);
                    _0x2721d5[_0x3504b0] || _0x49691e[_0x3504b0] || (_0x49691e[_0x3504b0] = 1, _0x451a44.push(_0x3504b0));
                    _0x2721d5[_0xa35d5b] || _0x49691e[_0xa35d5b] || (_0x49691e[_0xa35d5b] = 1, _0x451a44.push(_0xa35d5b));
                    ;
                }
                for (; _0x451a44.length;) {
                    const _0x2fc45d = _0x451a44.pop(), _0x22e104 = _0x2fc45d % _0xafb5b3, _0x19fad3 = Math.floor(_0x2fc45d / _0xafb5b3), _0x372b9b = [
                            [ _0x22e104 - 1,  _0x19fad3 ],
                            [ _0x22e104 + 1, _0x19fad3 ],
                            [ _0x22e104, _0x19fad3 - 1 ],
                            [ _0x22e104, _0x19fad3 + 1 ]
                        ];
                    for (let _0x175bc5 = 0; _0x175bc5 < _0x372b9b.length; _0x175bc5++) {
                        const _0x696615 = _0x372b9b[_0x175bc5][0], _0x3dda9f = _0x372b9b[_0x175bc5][1];
                        if (_0x696615 < 0 || _0x696615 >= _0xafb5b3 || _0x3dda9f < 0 || _0x3dda9f >= _0x348f02) {
                            continue;
                        }
                        const _0x1de8bc = _0x3dda9f * _0xafb5b3 + _0x696615;
                        _0x2721d5[_0x1de8bc] || _0x49691e[_0x1de8bc] || (_0x49691e[_0x1de8bc] = 1, _0x451a44.push(_0x1de8bc));
                    }
                }
                const _0x292746 = new Uint8Array(_0xafb5b3 * _0x348f02);
                let _0x21df93 = 0, _0x5ee083 = 0, _0x76c2fb = 0;
                for (let _0x1ff7d6 = 0; _0x1ff7d6 < _0xafb5b3 * _0x348f02; _0x1ff7d6++) {
                    !_0x2721d5[_0x1ff7d6] && _0x49691e[_0x1ff7d6] || (_0x292746[_0x1ff7d6] = 1, _0x21df93 += _0x1ff7d6 % _0xafb5b3, _0x5ee083 += Math.floor(_0x1ff7d6 / _0xafb5b3), _0x76c2fb++);
                }
                if (0 === _0x76c2fb) {
                    return new ImageData(_0xafb5b3, _0x348f02);
                }
                const _0x4c99be = document.createElement('canvas');
                _0x4c99be.width = _0xafb5b3;
                _0x4c99be.height = _0x348f02;
                ;
                const _0x5f0fd3 = _0x4c99be.getContext('2d', { 'willReadFrequently': true }), _0x809205 = _0x5f0fd3.createImageData(_0xafb5b3, _0x348f02);
                for (let _0x5650bc = 0; _0x5650bc < _0xafb5b3 * _0x348f02; _0x5650bc++) {
                    if (_0x292746[_0x5650bc]) {
                        const _0x43a346 = 4 * _0x5650bc;
                        _0x809205.data[_0x43a346] = 255;
                        _0x809205.data[_0x43a346 + 1] = 0;
                        _0x809205.data[_0x43a346 + 2] = 0;
                        _0x809205.data[_0x43a346 + 3] = 255;
                        ;
                    } else {
                        const _0x26e0a7 = 4 * _0x5650bc;
                        _0x809205.data[_0x26e0a7 + 3] = 0;
                    }
                }
                _0x5f0fd3.putImageData(_0x809205, 0, 0);
                const _0x48e2c3 = _0x21df93 / _0x76c2fb, _0x25bd39 = _0x5ee083 / _0x76c2fb, _0x13d291 = document.createElement('canvas');
                _0x13d291.width = _0xafb5b3;
                _0x13d291.height = _0x348f02;
                ;
                const _0x2ed18e = _0x13d291.getContext('2d', { 'willReadFrequently': true });
                _0x2ed18e.imageSmoothingEnabled = false;
                _0x2ed18e.translate(_0x48e2c3, _0x25bd39);
                _0x2ed18e.scale(_0x565c0a, _0x565c0a);
                _0x2ed18e.translate(-_0x48e2c3, -_0x25bd39);
                _0x2ed18e.drawImage(_0x4c99be, 0, 0);
                ;
                const _0x5bf593 = _0x2ed18e.getImageData(0, 0, _0xafb5b3, _0x348f02);
                for (let _0x25c732 = 0; _0x25c732 < _0x5bf593.data.length; _0x25c732 += 4) {
                    _0x5bf593.data[_0x25c732 + 3] > 128 ? (_0x5bf593.data[_0x25c732] = 255, _0x5bf593.data[_0x25c732 + 1] = 0, _0x5bf593.data[_0x25c732 + 2] = 0, _0x5bf593.data[_0x25c732 + 3] = 255) : _0x5bf593.data[_0x25c732 + 3] = 0;
                }
                return _0x5bf593;
            }(_0x103b93, 0.8), _0x534db5 = [], _0x215f86 = _0x56f023.data;
        for (let _0x5ec352 = 0; _0x5ec352 < _0x215f86.length; _0x5ec352 += 4) {
            _0x534db5.push(_0x215f86[_0x5ec352 + 3] > 0);
        }
        let _0x4ec8d9 = 0, _0x41ce45 = 0.2 * _0x534db5.length;
        for (let _0x423244 = 0; _0x423244 < _0x534db5.length; _0x423244++) {
            if (_0x534db5[_0x423244] && _0x366bc8[_0x423244] && (_0x4ec8d9++, _0x4ec8d9 > _0x41ce45)) {
                return void (_0x243bb7 = false);
            }
        }
        let _0x378675 = function (_0x4a7f30, _0x131448, _0x776576 = 2, _0x5c2b00 = 0.3, _0x544673 = 30) {
            _0x776576 = 1;
            _0x5c2b00 = 0.99;
            _0x544673 = 70;
            let _0x2314e3 = 0;
            if (0 === _0x4a7f30.length || 0 === _0x131448.length) {
                return 1e+400;
            }
            const _0x1742ee = new Set(_0x131448.map(_0x5e1bc7 => _0x5e1bc7.x + ',' + _0x5e1bc7.y));
            let _0x34b48f = 0, _0x4cbae7 = 0, _0x2ef315 = false;
            for (let _0x29d7be of _0x4a7f30) {
                let _0x205399 = 1e+400;
                for (let _0x4cf8b9 = -_0x776576; _0x4cf8b9 <= _0x776576; _0x4cf8b9++) {
                    for (let _0xa6e070 = -_0x776576; _0xa6e070 <= _0x776576; _0xa6e070++) {
                        if (_0x1742ee.has(_0x29d7be.x + _0xa6e070 + ',' + (_0x29d7be.y + _0x4cf8b9))) {
                            const _0xe233e5 = _0xa6e070 * _0xa6e070 + _0x4cf8b9 * _0x4cf8b9;
                            _0xe233e5 < _0x205399 && (_0x205399 = _0xe233e5);
                        }
                    }
                }
                _0x205399 <= _0x776576 * _0x776576 ? (_0x34b48f++, _0x4cbae7++, _0x4cbae7 > _0x2314e3 && (_0x2314e3 = _0x4cbae7), _0x4cbae7 >= _0x544673 && (_0x2ef315 = true)) : _0x4cbae7 = 0;
            }
            const _0x2984ba = _0x34b48f / _0x4a7f30.length;
            if (_0x4e1087 && _0x2984ba >= _0x41701a) {
                return _0x243bb7 = false, _0x273d08++, void (_0x2664e1 = true);
            }
            _0x2984ba > _0x41701a && (_0x41701a = _0x2984ba);
            if (_0x2984ba > 0.99) {
                return _0x243bb7 = false, _0x273d08++, void (_0x2664e1 = true);
            }
            if (_0x2984ba < _0x5c2b00 || !_0x2ef315) {
                return _0x243bb7 = false, _0x2664e1 = false, 1e+400;
            }
            return _0x273d08++, _0x2664e1 = true, _0x243bb7 = false, 1 - _0x2984ba;
        }(_0x58bf76(_0x103b93), _0x58bf76(_0x1cf168), _0x3590ed, _0x2b732e, _0x49f95d);
        return _0x378675;
    }
    function _0x3c486f(_0x1b008a, _0x2d449b) {
        ;
        if (!_0x1b008a || !_0x2d449b) {
            return _0x243bb7 = false, 'Error: Invalid canvas input';
        }
        const _0x249a4a = _0x1b008a.getContext('2d', { 'willReadFrequently': true }), _0x150060 = _0x2d449b.getContext('2d', { 'willReadFrequently': true });
        if (!_0x249a4a || !_0x150060) {
            return _0x243bb7 = false, 'Error: Canvas context not available';
        }
        const _0x2fb965 = _0x249a4a.getImageData(0, 0, _0x1b008a.width, _0x1b008a.height);
        let _0x21b28b = _0x150060.getImageData(0, 0, _0x2d449b.width, _0x2d449b.height);
        _0x21b28b = function (_0x211780) {
            const _0x410eb0 = _0x211780.width, _0x37795b = _0x211780.height, _0x48ce4c = _0x211780.data, _0x4909d9 = new Uint8ClampedArray(_0x48ce4c.length);
            for (let _0x4795cd = 0; _0x4795cd < _0x48ce4c.length; _0x4795cd += 4) {
                _0x48ce4c[_0x4795cd + 3] > 100 ? (_0x4909d9[_0x4795cd] = 255, _0x4909d9[_0x4795cd + 1] = 0, _0x4909d9[_0x4795cd + 2] = 0, _0x4909d9[_0x4795cd + 3] = 255) : (_0x4909d9[_0x4795cd] = 0, _0x4909d9[_0x4795cd + 1] = 0, _0x4909d9[_0x4795cd + 2] = 0, _0x4909d9[_0x4795cd + 3] = 0);
            }
            return new ImageData(_0x4909d9, _0x410eb0, _0x37795b);
        }(_0x21b28b);
        let _0x4d5a73 = _0x2fb965;
        const _0x5772d6 = function (_0x3804b2, _0x2bf006 = 1, _0x3e2cb1 = false) {
                const _0x39b368 = _0x3804b2.width, 
                      _0x232bdc = _0x3804b2.height, 
                      _0x2adf9f = _0x3804b2.data, 
                      _0x2df460 = [
                        [ 4, 0 ],
                        [ 0, -4 ] ], 
                      _0x1de296 = [
                        [ 0, 4 ],
                        [ -4, 0 ] ];
                var _0x4686ff = new Uint8ClampedArray(_0x39b368 * _0x232bdc * 4);
                const _0x22ca23 = new Array(_0x232bdc);
                for (let _0x35d482 = 0; _0x35d482 < _0x232bdc; _0x35d482++) {
                    _0x22ca23[_0x35d482] = new Array(_0x39b368);
                    for (let _0x163288 = 0; _0x163288 < _0x39b368; _0x163288++) {
                        const _0x57db91 = 4 * (_0x35d482 * _0x39b368 + _0x163288), _0x1bfc38 = _0x2adf9f[_0x57db91], _0x3b1501 = _0x2adf9f[_0x57db91 + 1], _0x29d586 = _0x2adf9f[_0x57db91 + 2];
                        _0x22ca23[_0x35d482][_0x163288] = 0.299 * _0x1bfc38 + 0.587 * _0x3b1501 + 0.114 * _0x29d586;
                    }
                }
                for (let _0x3fbb82 = 0; _0x3fbb82 < _0x232bdc - 1; _0x3fbb82++) {
                    for (let _0x255066 = 0; _0x255066 < _0x39b368 - 1; _0x255066++) {
                        let _0x468be1 = 0, _0x532c1a = 0;
                        for (let _0x2d1727 = 0; _0x2d1727 < 2; _0x2d1727++) {
                            for (let _0x35a0e6 = 0; _0x35a0e6 < 2; _0x35a0e6++) {
                                const _0x16d2e6 = _0x22ca23[_0x3fbb82 + _0x2d1727][_0x255066 + _0x35a0e6];
                                _0x468be1 += _0x2df460[_0x2d1727][_0x35a0e6] * _0x16d2e6;
                                _0x532c1a += _0x1de296[_0x2d1727][_0x35a0e6] * _0x16d2e6;
                            }
                        }
                        const _0xdd9d22 = Math.sqrt(_0x468be1 * _0x468be1 + _0x532c1a * _0x532c1a), _0x5dcad8 = Math.min(255, Math.max(0, _0x2bf006 * _0xdd9d22)), _0x5de965 = 4 * (_0x3fbb82 * _0x39b368 + _0x255066);
                        _0x3e2cb1 ? _0x5dcad8 > 0 ? (_0x4686ff[_0x5de965] = 255, _0x4686ff[_0x5de965 + 1] = 0, _0x4686ff[_0x5de965 + 2] = 0, _0x4686ff[_0x5de965 + 3] = 255) : (_0x4686ff[_0x5de965] = 0, _0x4686ff[_0x5de965 + 1] = 0, _0x4686ff[_0x5de965 + 2] = 0, _0x4686ff[_0x5de965 + 3] = 0) : _0x5dcad8 > 155 ? (_0x4686ff[_0x5de965] = 0, _0x4686ff[_0x5de965 + 1] = 255, _0x4686ff[_0x5de965 + 2] = 0, _0x4686ff[_0x5de965 + 3] = 255) : (_0x4686ff[_0x5de965] = 0, _0x4686ff[_0x5de965 + 1] = 0, _0x4686ff[_0x5de965 + 2] = 0, _0x4686ff[_0x5de965 + 3] = 0);
                    }
                }
                return _0x3e2cb1 && (_0x4686ff = _0x35461f(_0x3804b2)), new ImageData(_0x4686ff, _0x39b368, _0x232bdc);
            }(_0x21b28b, 1, true), _0x3b067c = _0x58bf76(_0x4d5a73), _0x27c62d = _0x58bf76(_0x5772d6);
        if (0 === _0x3b067c.length || 0 === _0x27c62d.length) {
            return _0x243bb7 = false, _0x4bbd5f = true, 'No edges detected in one or both images';
        }
        _0x266fc8(_0x5772d6, _0x4d5a73, 5);
    }
    async function _0x46a402(_0x36aa47, _0xdb38e6, _0x3211c2, _0x54efc2, _0x5b1753) {
        const _0x1133d8 = document.getElementById('cc_puzzle'), _0x5f2a1a = (_0x1133d8.getElementsByTagName('img'), _0x36aa47), _0x47b046 = _0xdb38e6;
        _0x5f2a1a.style.position = 'absolute';
        _0x5f2a1a.style.left = '0px';
        _0x5f2a1a.style.top = '0px';
        const _0x30a40e = _0x1133d8.getBoundingClientRect(), _0x1af83f = _0x47b046.getBoundingClientRect(), _0x5a0a98 = getComputedStyle(_0x47b046), _0x57587c = new DOMMatrixReadOnly(_0x5a0a98.transform);
        let _0x76a209 = Math.atan2(_0x57587c.b, _0x57587c.a);
        _0x76a209 < 0 && (_0x76a209 += 2 * Math.PI);
        const _0x10d1c7 = _0x3211c2, _0x2f6a56 = _0x54efc2, _0x2397fa = (_0x1af83f.left, _0x30a40e.left, _0x1af83f.width, _0x1af83f.top, _0x30a40e.top, _0x1af83f.height, document.createElement('canvas'));
        _0x2397fa.width = _0x1af83f.width;
        _0x2397fa.height = _0x1af83f.height;
        _0x2397fa.getContext('2d', { 'willReadFrequently': true }).drawImage(_0x5f2a1a, _0x1af83f.left - _0x30a40e.left, _0x1af83f.top - _0x30a40e.top, _0x1af83f.width, _0x1af83f.height, 0, 0, _0x1af83f.width, _0x1af83f.height);
        const _0xf168fc = document.createElement('canvas');
        _0xf168fc.width = _0x1af83f.width;
        _0xf168fc.height = _0x1af83f.height;
        const _0x3569a9 = _0xf168fc.getContext('2d', { 'willReadFrequently': true });
        return _0x3569a9.translate(_0xf168fc.width / 2, _0xf168fc.height / 2), _0x3569a9.rotate(_0x76a209), _0x3569a9.drawImage(_0x47b046, -_0x10d1c7 / 2, -_0x2f6a56 / 2, _0x10d1c7, _0x2f6a56), _0x3c486f(_0x2397fa, _0xf168fc);
    }
    async function _0x5a1a98(_0x25f7ef) {
        return await new Promise(_0x1bb0eb => setTimeout(_0x1bb0eb, _0x25f7ef));
    }
    let _0x584ce2 = setInterval(async function () {
        if (document.querySelector('#cc_puzzle') && document.querySelector('#cc_puzzle img')) {
            clearInterval(_0x584ce2);
            GM_log('Solving..');
            DISPLAY_STATUS && document.body.appendChild(DisplayStatus);
            _0x51cce4('Solving..');
            let _0x16e082 = document.querySelector('#cc_puzzle img');
            const _0x17616d = document.createElement('canvas');
            _0x17616d.width = _0x16e082.width;
            _0x17616d.height = _0x16e082.height;
            const _0x375156 = _0x17616d.getContext('2d', { 'willReadFrequently': true });
            _0x375156.drawImage(_0x16e082, 0, 0);
            let _0x4846f3 = function (_0x304750) {
                    const _0x12277d = document.createElement('canvas');
                    return _0x12277d.width = _0x304750.width, _0x12277d.height = _0x304750.height, _0x12277d.getContext('2d', { 'willReadFrequently': true }).putImageData(_0x304750, 0, 0), _0x12277d.toDataURL('image/webp');
                }(function (_0x230304, _0x3fa2f8 = 0) {
                    const _0x65989a = _0x230304.width, _0x4d461c = _0x230304.height;
                    let _0x35b95d = _0x230304.data;
                    _0x3fa2f8 > 0 && (_0x35b95d = _0x4c9e36(_0x230304, _0x3fa2f8));
                    const _0x1f88c8 = new Uint8ClampedArray(_0x35b95d.length), _0x52f174 = [
                            -3,
                            0,
                            3,
                            -10,
                            0,
                            10,
                            -3,
                            0,
                            3
                        ], _0x2dbf73 = [
                            -3,
                            -10,
                            -3,
                            0,
                            0,
                            0,
                            3,
                            10,
                            3
                        ];
                    for (let _0x1d12ab = 1; _0x1d12ab < _0x4d461c - 1; _0x1d12ab++) {
                        for (let _0x4a697d = 1; _0x4a697d < _0x65989a - 1; _0x4a697d++) {
                            const _0x2df6b6 = 4 * (_0x1d12ab * _0x65989a + _0x4a697d);
                            let _0x5417d3 = 0, _0x39bfbe = 0, _0x59fe8e = 0, _0x1e3429 = 0, _0x408a04 = 0, _0x187c31 = 0;
                            for (let _0x4df112 = -1; _0x4df112 <= 1; _0x4df112++) {
                                for (let _0x40ccc2 = -1; _0x40ccc2 <= 1; _0x40ccc2++) {
                                    const _0x5a06bc = 4 * ((_0x1d12ab + _0x4df112) * _0x65989a + (_0x4a697d + _0x40ccc2)), _0x1d3df9 = 3 * (_0x4df112 + 1) + (_0x40ccc2 + 1), _0x199ba5 = _0x35b95d[_0x5a06bc], _0x4be040 = _0x35b95d[_0x5a06bc + 1], _0x1d5bd3 = _0x35b95d[_0x5a06bc + 2];
                                    _0x5417d3 += _0x199ba5 * _0x52f174[_0x1d3df9];
                                    _0x59fe8e += _0x4be040 * _0x52f174[_0x1d3df9];
                                    _0x408a04 += _0x1d5bd3 * _0x52f174[_0x1d3df9];
                                    _0x39bfbe += _0x199ba5 * _0x2dbf73[_0x1d3df9];
                                    _0x1e3429 += _0x4be040 * _0x2dbf73[_0x1d3df9];
                                    _0x187c31 += _0x1d5bd3 * _0x2dbf73[_0x1d3df9];                                }
                            }
                            const _0x5ae3be = Math.sqrt(_0x5417d3 * _0x5417d3 + _0x39bfbe * _0x39bfbe), _0x165d3c = Math.sqrt(_0x59fe8e * _0x59fe8e + _0x1e3429 * _0x1e3429), _0x455c25 = Math.sqrt(_0x408a04 * _0x408a04 + _0x187c31 * _0x187c31);
                            _0x1f88c8[_0x2df6b6] = Math.min(255, _0x5ae3be);
                            _0x1f88c8[_0x2df6b6 + 1] = Math.min(255, _0x165d3c);
                            _0x1f88c8[_0x2df6b6 + 2] = Math.min(255, _0x455c25);
                            _0x1f88c8[_0x2df6b6 + 3] = 255;
                        }
                    }
                    for (let _0x1f127a = 1; _0x1f127a < _0x4d461c - 1; _0x1f127a++) {
                        for (let _0x44f376 = 1; _0x44f376 < _0x65989a - 1; _0x44f376++) {
                            const _0x1c3f98 = 4 * (_0x1f127a * _0x65989a + _0x44f376);
                            255 == _0x1f88c8[_0x1c3f98] || 255 == _0x1f88c8[_0x1c3f98 + 1] || 255 == _0x1f88c8[_0x1c3f98 + 2] ? (_0x1f88c8[_0x1c3f98] = 0, _0x1f88c8[_0x1c3f98 + 1] = 255, _0x1f88c8[_0x1c3f98 + 2] = 0, _0x1f88c8[_0x1c3f98 + 3] = 255) : (_0x1f88c8[_0x1c3f98] = 0, _0x1f88c8[_0x1c3f98 + 1] = 0, _0x1f88c8[_0x1c3f98 + 2] = 0, _0x1f88c8[_0x1c3f98 + 3] = 0);
                        }
                    }
                    return new ImageData(_0x1f88c8, _0x65989a, _0x4d461c);
                }(_0x375156.getImageData(0, 0, _0x17616d.width, _0x17616d.height), 1.1)), _0x3258e1 = new Image();
            _0x3258e1.src = _0x4846f3;
            _0x3258e1.onload = async function () {
                for (let _0x168c33 = 0; _0x168c33 < 2; _0x168c33++) {
                    _0x41701a = 0;
                    for (let _0x164c43 = 0; _0x164c43 < 10 && !_0x2664e1; _0x164c43++) {
                        let _0x34e327 = document.querySelector('#ccpzp' + _0x168c33.toString()).width, _0x3e75e7 = document.querySelector('#ccpzp' + _0x168c33.toString()).height;
                        await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                        document.querySelector('#btn_cctranslate_' + _0x168c33.toString())?.click();
                        await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                        let _0xae2f69 = document.querySelector('#cc_puzzle')?.getElementsByTagName('img');
                        if (_0xae2f69.length < _0x168c33 + 2) {
                            return void GM_log('Need at least ' + (_0x168c33 + 2) + 'images inside #cc_puzzle (background + overlay)');
                        }
                        for (_0x243bb7 = true, _0x46a402(_0x3258e1, _0xae2f69[_0x168c33 + 1], _0x34e327, _0x3e75e7); _0x243bb7;) {
                            await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                        }
                        if (_0x2664e1) {
                            break;
                        }
                        if (_0x4bbd5f) {
                            _0x4bbd5f = false;
                        } else {
                            for (let _0xc535d8 = 0; _0xc535d8 < 10; _0xc535d8++) {
                                await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                                document.querySelector('#btn_ccrotate_' + _0x168c33.toString())?.click();
                                let _0x540da5 = document.querySelector('#cc_puzzle')?.getElementsByTagName('img');
                                for (_0x243bb7 = true, _0x46a402(_0x3258e1, _0x540da5[_0x168c33 + 1], _0x34e327, _0x3e75e7); _0x243bb7;) {
                                    await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                                }
                                if (_0x4bbd5f) {
                                    _0x4bbd5f = false;
                                    break;
                                }
                                if (_0x2664e1) {
                                    break;
                                }
                            }
                        }
                    }
                    if (_0x2664e1) {
                        _0x2664e1 = false;
                    } else {
                        _0x4e1087 = true;
                        for (let _0xb2bea7 = 0; _0xb2bea7 < 10 && !_0x2664e1; _0xb2bea7++) {
                            let _0x7d695c = document.querySelector('#ccpzp' + _0x168c33.toString()).width, _0x36d42e = document.querySelector('#ccpzp' + _0x168c33.toString()).height;
                            await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                            document.querySelector('#btn_cctranslate_' + _0x168c33.toString())?.click();
                            await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                            let _0x53a4e0 = document.querySelector('#cc_puzzle')?.getElementsByTagName('img');
                            if (_0x53a4e0.length < _0x168c33 + 2) {
                                return void GM_log('Need at least ' + (_0x168c33 + 2) + 'images inside #cc_puzzle (background + overlay)');
                            }
                            for (_0x243bb7 = true, _0x46a402(_0x3258e1, _0x53a4e0[_0x168c33 + 1], _0x7d695c, _0x36d42e); _0x243bb7;) {
                                await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                            }
                            if (_0x2664e1) {
                                break;
                            }
                            if (_0x4bbd5f) {
                                _0x4bbd5f = false;
                            } else {
                                for (let _0x54c18f = 0; _0x54c18f < 10; _0x54c18f++) {
                                    await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                                    document.querySelector('#btn_ccrotate_' + _0x168c33.toString())?.click();
                                    ;
                                    let _0x37c12c = document.querySelector('#cc_puzzle')?.getElementsByTagName('img');
                                    for (_0x243bb7 = true, _0x46a402(_0x3258e1, _0x37c12c[_0x168c33 + 1], _0x7d695c, _0x36d42e); _0x243bb7;) {
                                        await _0x5a1a98(DELAY_AFTER_EACH_ROTATION);
                                    }
                                    if (_0x4bbd5f) {
                                        _0x4bbd5f = false;
                                        break;
                                    }
                                    if (_0x2664e1) {
                                        break;
                                    }
                                }
                            }
                        }
                        _0x4e1087 = false;
                    }
                    _0x2664e1 && (_0x2664e1 = false);
                }
                2 == _0x273d08 ? (GM_log('Puzzle Solved'), _0x51cce4('Puzzle Solved')) : (GM_log('Puzzle cannot be Solved'), _0x51cce4('Puzzle cannot be Solved'));
            }
        }
    }, 5000);
}());