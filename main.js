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
    let GE1 = c1.options[c1.selectedIndex].value;
    // get the second GE category
    let c2 = document.getElementById("c2");
    let GE2 = c2.options[c2.selectedIndex].value;

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