document.addEventListener("DOMContentLoaded", (event) => {
    $("html").css("overflow-x", "hidden")

    $ (function() {
        $ ("#naviframe").load("/html/navigation.html");
    })

    if (document.body.id == "404") {
        if (location.href.endsWith(".html") != true) {
            location.href = (location.href + ".html")
        }
    }

    if (document.body.id == "index") {
        document.getElementById("lans").src = "images/lans/" + (Math.floor(Math.random() * Math.floor(16)) + 1) + ".png"
    }

    $(function() {
        $("#smooth").smoothState();
    });
})