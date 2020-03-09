// $.ajax(
// {
//     method: "GET",
//     url: "http://cors-anywhere.herokuapp.com/https://classes.usc.edu/term-20201/classes/arts/",
// }
// ).done(function(response)
// {
//     console.log(response);
//     var data = {html: html};
//     var json = JSON.stringify(data);
// }).fail(function()
// {
//     console.log("failed");
// });

// // var name = "codemzy";var url = "http://anyorigin.com/go?url=" + encodeURIComponent("https://www.codewars.com/users/") + name + "&callback=?";$.get(url, function(response) {  console.log(response);});


// Custom Select
// Source: https://codepen.io/yy/pen/vOYqYV
// https://freefrontend.com/css-select-boxes/
$(".custom-select").each(function() 
{
    var classes = $(this).attr("class"), id = $(this).attr("id"), name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + "</span>";
    template += '<div class="custom-options">';
    $(this)
        .find("option")
        .each(function() 
        {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
        }
        );
    template += "</div></div>";
    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
});

$(".custom-option:first-of-type").hover(
function() {
    $(this)
    .parents(".custom-options")
    .addClass("option-hover");
},
function() {
    $(this)
    .parents(".custom-options")
    .removeClass("option-hover");
}
);
$(".custom-select-trigger").on("click", function() {
$("html").one("click", function() {
    $(".custom-select").removeClass("opened");
});
$(this)
    .parents(".custom-select")
    .toggleClass("opened");
event.stopPropagation();
});
$(".custom-option").on("click", function() {
$(this)
    .parents(".custom-select-wrapper")
    .find("select")
    .val($(this).data("value"));
$(this)
    .parents(".custom-options")
    .find(".custom-option")
    .removeClass("selection");
$(this).addClass("selection");
$(this)
    .parents(".custom-select")
    .removeClass("opened");
$(this)
    .parents(".custom-select")
    .find(".custom-select-trigger")
    .text($(this).text());
});
  