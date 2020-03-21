const request = require('request');
const cheerio = require('cheerio');

let terms = [];
let geList = ["arts", "hinq", "sana", "life", "psc", "qrea", "gpg", "gph"]

// Scrape the terms at classes.usc.edu
request('https://classes.usc.edu', (error, response, html) =>
{
    if (!error && response.statusCode == 200)
    {
        const $ = cheerio.load(html);

        let yrs = $('.term-code');

        yrs.each(function(index)
        {
            // console.log(yrs.eq(index).text().slice(-5));
            terms.push(yrs.eq(index).text().slice(-5));
        });
    }

    // Scrape the GEs of each year
    for (let i = 0; i < terms.length; ++i)
    {
        for (let j = 0; j < geList.length; ++j)
        {
            request('https://classes.usc.edu/term-' + terms[i] + '/classes/' + geList[j] + '/', (error, response, html) =>
            {
                if (!error && response.statusCode == 200)
                {
                    const $ = cheerio.load(html);
        
                    let cl = $('.courselink');
        
                    cl.each(function(index)
                    {
                        console.log(cl.eq(index).text());
                    });
                }
        
                console.log("Current term: " + terms[i]);
                console.log("Current GE: " + geList[j]);
                console.log("============================");
            });
        }
    }


});
