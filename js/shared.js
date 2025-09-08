document.addEventListener("DOMContentLoaded",function() {
    $("html").css("overflow-x", "hidden");

    // local server fix
    const Path = document.location.pathname.split("/").pop().split(".");
    if (document.location.hostname == "127.0.0.1" && Path.length == 1 && Path[0].length > 0) {location.href += ".html"};

    const Favicon = top.document.createElement("link");
    Favicon.rel = "icon";
    Favicon.href = "/favicon.ico";
    Favicon.type = "image/x-icon";
    top.document.head.appendChild(Favicon);
})