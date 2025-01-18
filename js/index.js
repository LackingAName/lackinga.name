function LoadUser() {
    const Random = (Math.floor(Math.random() * Math.floor(20)) + 1)
    document.getElementById("User").src = "images/User/" + Random + ".png"
    document.getElementById("UserLabel").innerHTML = Random
}

window.onload = function() {
    var Favicon = top.document.createElement("link")
    Favicon.rel = "icon"
    Favicon.href = "/favicon.ico"
    Favicon.type = "image/x-icon"
    top.document.getElementsByTagName("head")[0].appendChild(Favicon)
}

document.addEventListener("DOMContentLoaded",() => {
    $("html").css("overflow-x", "hidden")

    $(function() {$("#naviframe").load("/html/nav.html")})

    if (document.body.id == "index") {LoadUser()}
})