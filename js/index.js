document.addEventListener("DOMContentLoaded", (event) => {
    $ (function() {
        $ ("#naviframe").load("/html/navigation.html");
    })
    $ (function() {
        $ ("#cmd").load("/html/cmd.html");
    })

    if (document.body.id == "404") {
        if (location.href.endsWith(".html") != true) {
            location.href = (location.href + ".html")
        }
    }

    document.getElementById("lans").src = "images/lans/" + (Math.floor(Math.random() * Math.floor(16)) + 1) + ".png"
})
