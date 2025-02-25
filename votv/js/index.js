var Pages = [
    "/",
    "./",
    "mods",
    "ss",
]

function ToggleSpoilers() {
    document.cookie = "spoilers=" + (1 - Number(document.cookie.split("=")[1]))
    location.reload()
}

window.onload = function() {
    if (!document.cookie.includes("spoilers")) {document.cookie = "spoilers=0"}
    if (document.cookie.includes("spoilers=0")) {
        document.body.style.backgroundImage = null
        if (document.body.id == "ss") {
            document.body.innerHTML = "<p>basically this whole page has spoilers</p>"
        }
    }
    document.documentElement.style.setProperty("--selectedOffset", Math.abs(85 * (Pages.indexOf(document.body.id))) + "px")

    var nfs = top.document.createElement("div")
    nfs.id = "naviframeSpace"
    top.document.body.insertBefore(nfs,document.body.firstChild)
    var nf = top.document.createElement("div")
    nf.id = "naviframe"
    top.document.body.insertBefore(nf,document.body.firstChild)
    $(function() {$("#naviframe").load("html/nav.html")})

    var Favicon = top.document.createElement("link")
    Favicon.rel = "icon"
    Favicon.href = "/favicon.ico"
    Favicon.type = "image/x-icon"
    top.document.head.appendChild(Favicon)

    $(this).on("keypress",function(Input) {
        var Key = Number(Input.key) - 1
        if (Pages[Key]) {location.href = Pages[Key]}
    })
}

document.addEventListener("DOMContentLoaded",() => {
    $("html").css("overflow-x", "hidden")
    
    //if (document.body.id == "404" && !location.href.endsWith(".html")) {location.href = (location.href + ".html")};
})