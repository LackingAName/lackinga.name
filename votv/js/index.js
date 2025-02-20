var Pages = [
    "/",
    "./",
    "mods",
]

window.onload = function() {
    var Favicon = top.document.createElement("link")
    Favicon.rel = "icon"
    Favicon.href = "/favicon.ico"
    Favicon.type = "image/x-icon"
    top.document.head.appendChild(Favicon)

    var nfs = top.document.createElement("div")
    nfs.id = "naviframeSpace"
    top.document.body.insertBefore(nfs,document.body.firstChild)
    var nf = top.document.createElement("div")
    nf.id = "naviframe"
    top.document.body.insertBefore(nf,document.body.firstChild)
    $(function() {$("#naviframe").load("html/nav.html")})

    $(this).on("keypress",function(Input) {
        var Key = Number(Input.key) - 1
        if (Pages[Key]) {location.href = Pages[Key]}
    })
}

document.addEventListener("DOMContentLoaded",() => {
    $("html").css("overflow-x", "hidden")
    
    if (document.body.id == "404" && !location.href.endsWith(".html")) {location.href = (location.href + ".html")};
})