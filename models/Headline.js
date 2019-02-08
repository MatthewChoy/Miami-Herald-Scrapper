var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema= new Schema({  
    headline: {
        type: String,
        require: true,
        unique: true,
    },
    summary: { 
        type: String,
        require: true,
    },
    date: String,
    saved: {
        type: Boolean,
        default: false,
    }
});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
