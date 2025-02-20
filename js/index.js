const delay = ms => new Promise(res => setTimeout(res, ms));

function LoadUser() {
    var UL = document.getElementById("UserLabel")
    var Random = (Math.floor(Math.random() * Math.floor(23)) + 1)
    if (Random == UL.innerHTML) {Random += 1}
    document.getElementById("User").src = "images/User/" + Random + ".png"
    UL.innerHTML = Random

    DoULGlitch = (Random == 23)
    UL.style.color = "#fff"
    UL.style.transform = "none";
}

var DoULGlitch = false
const ULGlitch = async () => {
    if (!DoULGlitch || !document.getElementById("UserLabel")) {return}
    var UL = document.getElementById("UserLabel")
    
    if (Math.floor(Math.random() * Math.floor(10)) != 5) {return}

    var Random9000 = (Math.floor(Math.random() * Math.floor(7)) + 1)
    if (Random9000 == 1) { // Ik this code is attrocious
        var max = 3 + 1; var min = 2;
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),"?")
    } else if (Random9000 == 2) {
        UL.style.color = "#faa"
    } else if (Random9000 == 3) {
        var max = 50 + 1; var min = -50;
        UL.style.transform = "translateX(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (Random9000 == 4) {
        var max = 50 + 1; var min = -50;
        UL.style.transform = "translateY(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (Random9000 == 5) {
        var max = 150 + 1; var min = 50;
        UL.style.transform = "scaleX(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (Random9000 == 6) {
        var max = 150 + 1; var min = 50;
        UL.style.transform = "scaleY(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (Random9000 == 7) {
        var max = 10 + 1; var min = -10;
        UL.style.transform = "skewY(" + Math.floor(Math.random() * (max - min) + min) + "deg)";
    }

    await delay(1);
    UL.innerHTML = "23"
    UL.style.color = "#fff"
    UL.style.transform = "none";
}

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
    setInterval(ULGlitch,50)
}

document.addEventListener("DOMContentLoaded",() => {
    $("html").css("overflow-x", "hidden")

    $(function() {$("#naviframe").load("/html/nav.html")})

    if (document.body.id == "index") {LoadUser()}
    if (document.body.id == "404" && !location.href.endsWith(".html")) {location.href = (location.href + ".html")};
})