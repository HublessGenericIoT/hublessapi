var urlencode = require("urlencode");

module.exports = {
    encode: function(input) {
        if(input === undefined) return;
        console.log("Encoding raw: ", input);
        return urlencode(input).replace(/%/g, "#").replace(/'/g, "#AP");
    },
    decode: function(input) {
        console.log("Deciding raw: ", input);
        if(input === undefined) return;
        if(input.indexOf("#") === -1) {
            console.log("Nothing to decode:", input);
            return input; //return the string if it isn't encoded.
        }

        return urlencode.decode(input.replace(/#AP/g, "'").replace(/#/g, "%"));
    }
};
