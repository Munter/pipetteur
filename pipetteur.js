var colorNames = require('css-color-names');

var hexRegExp = /\w#([0-9A-F]{2}){3}\w/i;
var channelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,
    alphaChannelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)\s*/,
    cssColorRegExp = new RegExp(
                         '\\w(rgb|hsl|hsv)a?' +
                         '\\(' +
                             channelRegExp.source + ',' +
                             channelRegExp.source + ',' +
                             channelRegExp.source +
                             '(?:,' + alphaChannelRegExp.source + ')?' +
                         '\\)\\w', 'i');

var colorMatcher = function (str) {
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
    while (hexmatch = str.exec(hexRegExp)) {
        matches.push({
            index: hexmatch.index,
            match: hexmatch[0]
        });
    }

    // Match CSS colors
    while (cssmatch = str.exec(cssColorRegExp)) {
        matches.push({
            index: cssmatch.index,
            match: cssmatch[0]
        });
    }

    // Reset search indexes
    hexRegExp.lastIndex = 0;
    cssColorRegExp.lastIndex = 0;
};

colorMatcher.regexp = {
    hex: hexRegExp,
    css: cssColorRegExp
};

module.exports = colorMatcher;
