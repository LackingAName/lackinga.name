window.onload = function() {
    var Favicon = top.document.createElement("link");
    Favicon.rel = "icon";
    Favicon.href = "/favicon.ico";
    Favicon.type = "image/x-icon";
    top.document.getElementsByTagName("head")[0].appendChild(Favicon);
};

document.addEventListener("DOMContentLoaded",() => {
    $("html").css("overflow-x", "hidden");

    $(function() {
        $("#naviframe").load("/html/navigation.html");
    });

    if (document.body.id == "index") {
        document.getElementById("User").src = "images/User/" + (Math.floor(Math.random() * Math.floor(23)) + 1) + ".png";
    };

    if (document.body.id == "secret") {
        document.getElementById("bg").volume = 0.25;
    };
});