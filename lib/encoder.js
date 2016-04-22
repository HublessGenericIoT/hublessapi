var urlencode = require("urlencode");

module.exports = {
    encode: function(input) {
        return urlencode(input).replace(/%/g, "#").replace(/'/g, "#AP");
    },
    decode: function(input) {
        if(input)
            return urlencode.decode(input.replace(/#/g, "%").replace(/#AP/g, "'"));
        else
            return input;
    }
};
