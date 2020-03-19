let url = "https://classes.usc.edu/term-";
let url1;
let url2;
let GE1;
let GE2;

function geURL(category)
{
    if (category == "A")
        return "arts";
    else if (category == "B")
        return "hinq";
    else if (category == "C")
        return "sana";
    else if (category == "D")
        return "life";
    else if (category == "E")
        return "psc";
    else if (category == "F")
        return "qrea";
    else if (category == "G")
        return "gpg";
    else if (category == "H")
        return "gph";
}

document.querySelector("#r3").onsubmit = function(event)
{
    event.preventDefault();

    // get the year
    let y = document.getElementById("year");
    let yr = y.options[y.selectedIndex].value;
    // get the term
    let t = document.getElementById("term");
    let term = t.options[t.selectedIndex].value;
    let termText = t.options[t.selectedIndex].text;
    // get the first GE category
    let c1 = document.getElementById("c1");
    GE1 = c1.options[c1.selectedIndex].value;
    GE1 = geURL(GE1);
    // get the second GE category
    let c2 = document.getElementById("c2");
    GE2 = c2.options[c2.selectedIndex].value;
    GE2 = geURL(GE2);

    url1 = url + yr + term + "/classes/" + GE1 + "/";
    url2 = url + yr + term + "/classes/" + GE2 + "/";

    // Remove prev search results
    let tableHead = document.querySelector("thead");
    tableHead.removeChild(tableHead.lastChild);
    let tableBody = document.querySelector("tbody");
    while (tableBody.hasChildNodes())
        tableBody.removeChild(tableBody.lastChild);
    
    // Create <th> in thead
    let trTag = document.createElement("tr");
    let thTag = document.createElement("th");
    thTag.innerHTML = "GEs that are in category " + GE1 + " and " + GE2 + " in " + termText + " for " + yr + ": ";
    trTag.appendChild(thTag);
    document.querySelector("thead").appendChild(trTag);

    // do some scripting stuff

    trTag = document.createElement("tr");
    let tdTag = document.createElement("td");
    tdTag.innerHTML = "";
    trTag.appendChild(tdTag);
    document.querySelector("tbody").appendChild(trTag);
}

// Scraping
const request = require('request');
const cheerio = require('cheerio');
request(url1, (error, response, html) =>
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
});