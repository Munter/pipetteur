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
            expect(matches[0], 'to have properties', ['index', 'match']);
            expect(matches[0].index, 'to be', 0);
            expect(matches[0].match, 'to be', hex);
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
});
