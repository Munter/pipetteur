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
});
