const delay = ms => new Promise(res => setTimeout(res, ms));

function LoadUser() {
    var UL = document.getElementById("UserLabel")
    var Random = (Math.floor(Math.random() * Math.floor(23)) + 1)
    if (Random == UL.innerHTML) {Random += 1}
    document.getElementById("User").src = "images/User/" + Random + ".png"
    UL.innerHTML = Random

    DoULGlitch = (Random == 23)
    UL.style.color = "#fff"
    UL.style.transform = "none"
    UL.style.fontFamily = "Roboto Mono"
}

var DoULGlitch = false
var ULGlitchDebounce = false
var R = "`\'\"?&:;@#[]<>^_*/\\0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
const ULGlitch = async () => {
    if (!DoULGlitch || ULGlitchDebounce || !document.getElementById("UserLabel")) {return}
    var UL = document.getElementById("UserLabel")
    
    if (Math.floor(Math.random() * Math.floor(2)) != 1) {return}
    ULGlitchDebounce = true
    // Ik this code is attrocious

    var RandomReplace1 = (Math.floor(Math.random() * Math.floor(4)) + 1)
    if (RandomReplace1 == 2) {
        var max = 3 + 1; var min = 2;
        var replace = R.split("")[Math.floor(Math.random() * R.split("").length)]
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),replace)
    } else if (RandomReplace1 == 3) {
        var max = 3 + 1; var min = 2;
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),"?")
    }
    var RandomReplace2 = (Math.floor(Math.random() * Math.floor(4)) + 1)
    if (RandomReplace2 == 2) {
        var max = 3 + 1; var min = 2;
        var replace = R.split("")[Math.floor(Math.random() * R.split("").length)]
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),replace)
    } else if (RandomReplace1 == 3) {
        var max = 3 + 1; var min = 2;
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),"?")
    }

    var RandomColor = (Math.floor(Math.random() * Math.floor(6)) + 1)
    if (RandomColor == 2) {
        var max = 90 + 1; var min = 70;
        UL.style.color = "hsl(0,100%," + Math.floor(Math.random() * (max - min) + min) + "%)"
    } else if (RandomColor == 3) {
        UL.style.color = "#888"
    } else if (RandomColor == 4) {
        UL.style.color = "#aaa"
    }

    var RandomTransform = (Math.floor(Math.random() * Math.floor(10)) + 1)
    if (RandomTransform == 3) {
        var max = 50 + 1; var min = -50;
        UL.style.transform = "translateX(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (RandomTransform == 4) {
        var max = 50 + 1; var min = -50;
        UL.style.transform = "translateY(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (RandomTransform == 5) {
        var max = 150 + 1; var min = 10;
        UL.style.transform = "scaleX(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (RandomTransform == 6) {
        var max = 150 + 1; var min = 10;
        UL.style.transform = "scaleY(" + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (RandomTransform == 7) {
        var max = 10 + 1; var min = -10;
        UL.style.transform = "skewY(" + Math.floor(Math.random() * (max - min) + min) + "deg)";
    } else if (RandomTransform == 8) {
        var max = 30 + 1; var min = -30;
        UL.style.transform = "rotatez(" + Math.floor(Math.random() * (max - min) + min) + "deg)";
    }

    await delay(1);
    UL.innerHTML = "23"
    UL.style.color = "#fff"
    UL.style.transform = "none";
    UL.style.fontFamily = "Share-TechMono"
    ULGlitchDebounce = false
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