var expect = require('unexpected');
var pipetteur = require('../pipetteur');

describe('Hex match', function () {
    it('should match a set of valid 6-char hex strings', function (done) {
        var hexes = [
            '#000000',
            '#FFFFFF',
            '#ffffff',
            '#123456',
            '#abcdef',
            '#ABCDEF',
            '#fedcba',
            '#FEDCBA'
        ];

        expect(hexes, 'to be an array whose items satisfy', function (hex) {
            var matches = pipetteur(hex);

            expect(matches, 'to be a non-empty array');
            expect(matches, 'to have length', 1);
            expect(matches[0], 'to have properties', ['line', 'column', 'index', 'match', 'color']);
            expect(matches[0].line, 'to be', 1);
            expect(matches[0].column, 'to be', 1);
            expect(matches[0].index, 'to be', 0);
            expect(matches[0].match, 'to be', hex);
            expect(matches[0].color.isColor, 'to be', true);
            expect(matches[0].color.hex(), 'to be', hex.toLowerCase());
        });

        done();
    });

    it('should match a set of valid 3-char hex strings', function (done) {
        var hexes = [
            '#000',
            '#FFF',
            '#fff',
            '#123',
            '#abc',
            '#ABC',
            '#cba',
            '#CBA'
        ];

        expect(hexes, 'to be an array whose items satisfy', function (hex) {
            var matches = pipetteur(hex);

            expect(matches, 'to be a non-empty array');
            expect(matches, 'to have length', 1);
            expect(matches[0], 'to have properties', ['index', 'match']);
            expect(matches[0].index, 'to be', 0);
            expect(matches[0].match, 'to be', hex);
        });

        done();
    });

    it('should match a set of valid 6-char hex substrings', function (done) {
        var hexes = [
            {
                string: 'foo #000000 bar',
                hex: '#000000',
                index: 4
            },
            {
                string: 'one, two, #FFFFFF, three',
                hex: '#FFFFFF',
                index: 10
            },
            {
                string: 'hvid (#ffffff) er pænt',
                hex: '#ffffff',
                index: 6
            },
            {
                string: '#123456 are numbers',
                hex: '#123456',
                index: 0
            },
            {
                string: 'alphabet song: #abcdef',
                hex: '#abcdef',
                index: 15
            },
            {
                string: '#alphab et #ABCDEF gehijkl',
                hex: '#ABCDEF',
                index: 11
            },
            {
                string: 'background:#fedcba',
                hex: '#fedcba',
                index: 11
            },
            {
                string: '$color=#FEDCBA',
                hex: '#FEDCBA',
                index: 7
            }
        ];

        expect(hexes, 'to be an array whose items satisfy', function (obj) {
            var matches = pipetteur(obj.string);

            expect(matches, 'to be a non-empty array');
            expect(matches, 'to have length', 1);
            expect(matches[0], 'to have properties', ['index', 'match']);
            expect(matches[0].index, 'to be', obj.index);
            expect(matches[0].match, 'to be', obj.hex);
        });

        done();
    });

    it('should match a set of valid 3-char hex substrings', function (done) {
        var hexes = [
            {
                string: 'foo #000 bar',
                hex: '#000',
                index: 4
            },
            {
                string: 'one, two, #FFF, three',
                hex: '#FFF',
                index: 10
            },
            {
                string: 'hvid (#fff) er pænt',
                hex: '#fff',
                index: 6
            },
            {
                string: '#123 are numbers',
                hex: '#123',
                index: 0
            },
            {
                string: 'alphabet song: #abc',
                hex: '#abc',
                index: 15
            },
            {
                string: '#alphab et #ABC gehijkl',
                hex: '#ABC',
                index: 11
            },
            {
                string: 'background:#fed',
                hex: '#fed',
                index: 11
            },
            {
                string: '$color=#FED',
                hex: '#FED',
                index: 7
            }
        ];

        expect(hexes, 'to be an array whose items satisfy', function (obj) {
            var matches = pipetteur(obj.string);

            expect(matches, 'to be a non-empty array');
            expect(matches, 'to have length', 1);
            expect(matches[0], 'to have properties', ['index', 'match']);
            expect(matches[0].line, 'to be', 1);
            expect(matches[0].column, 'to be', obj.index + 1);
            expect(matches[0].index, 'to be', obj.index);
            expect(matches[0].match, 'to be', obj.hex);
        });

        done();
    });

    it('should not match non-hex strings', function (done) {
        var hexes = [
            '#',
            '#0',
            '#00',
            '#0000',
            '#00000',
            '#0000000'
        ];

        expect(hexes, 'to be an array whose items satisfy', function (hex) {
            var matches = pipetteur(hex);

            expect(matches, 'to be an empty array');
        });

        done();
    });

    it('should match multiple colors in the same string', function (done) {
        var strings = [
            '#000000 #ffffff',
            '#123456 and #234567',
            'First: #123, Second: #fff000',
            'Unlikely combination: #123#321'
        ];

        expect(strings, 'to be an array whose items satisfy', function (str) {
            var matches = pipetteur(str);

            expect(matches, 'to have length', 2);
        });

        done();
    });
});
