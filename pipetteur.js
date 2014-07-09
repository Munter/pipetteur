var colorNames = require('css-color-names');

var hexRegExp = /#(?:[0-9a-f]{6}|[0-9a-f]{3}(?![0-9a-f]))/gi;
var channelRegExp = /\s*\.\d+|\d+(?:\.\d+)?%?\s*/,
    alphaChannelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)\s*/,
    cssColorRegExp = new RegExp(
                         '(?:rgb|hsl|hsv)a?' +
                         '\\(' +
                             channelRegExp.source + ',' +
                             channelRegExp.source + ',' +
                             channelRegExp.source +
                             '(?:,' + alphaChannelRegExp.source + ')?' +
                         '\\)', 'gi');

var colorMatcher = function (str) {
    if (typeof str !== 'string') {
        throw new Error('pipeteur: Expected string input, got ' + typeof str);
    }

    var matches = [],
        parts = str.split(' '),
        hexmatch,
        cssmatch;

    // Match named colors
    parts.forEach(function (part, idx) {
        if (part in colorNames) {
            matches.push({
                index: parts.slice(0, idx).join(' ').length,
                match: part
            });
        }
    });

    // Object.keys(colorNames).forEach(function (name) {
    //     var idx = str.indexOf(name);

    //     if (idx !== -1) {
    //         matches.push({
    //             index: idx,
    //             match: name
    //         });
    //     }
    // });

    // Match hex colors
    while (hexmatch = hexRegExp.exec(str)) {
        matches.push({
            index: hexmatch.index,
            match: hexmatch[0]
        });
    }

    // Match CSS colors
    while (cssmatch = cssColorRegExp.exec(str)) {
        matches.push({
            index: cssmatch.index,
            match: cssmatch[0]
        });
    }

    // Reset search indexes
    hexRegExp.lastIndex = 0;
    cssColorRegExp.lastIndex = 0;

    return matches;
};

colorMatcher.regexp = {
    hex: hexRegExp,
    css: cssColorRegExp
};

module.exports = colorMatcher;
