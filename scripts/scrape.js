var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) { 
    request("https://www.miamiherald.com/sports/", function(err, res, body){ 
        
    var $ = cheerio.load(body);
        
        var articales = [];
        
        $(".theme-summary").each(function(i,element){

            var heading = $(this).children("").text().trim();
            var summary = $(this).children(".summary").text().trim;
        
            if(heading && summary){
                var headingNeat = heading.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headingNeat,
                    summary: summaryNeat
            };

            articles.push(dataToAdd);
        }
    });
    cb(articles);
});
};


module.export = scrape;