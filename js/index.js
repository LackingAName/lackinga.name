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
    UL.style.cursor = null
    UL.onclick = null
}

var DoULGlitch = false
var ULGlitchDebounce = false
var R = "`\'\"&:;@#[]<>^_*/\\0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
const ULGlitch = async () => {
    if (!DoULGlitch || ULGlitchDebounce || !document.getElementById("UserLabel")) {return}
    var UL = document.getElementById("UserLabel")
    
    if (Math.floor(Math.random() * Math.floor(2)) != 1) {return}
    ULGlitchDebounce = true
    // Ik this code is attrocious

    var RandomReplace1 = (Math.floor(Math.random() * Math.floor(6)) + 1)
    if (RandomReplace1 == 2) {
        var max = 3 + 1; var min = 2;
        var replace = R.split("")[Math.floor(Math.random() * R.split("").length)]
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),replace)
    } else if (RandomReplace1 == 3 || RandomReplace1 == 4 || RandomReplace1 == 5) {
        var max = 3 + 1; var min = 2;
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),"?")
    }
    var RandomReplace2 = (Math.floor(Math.random() * Math.floor(6)) + 1)
    if (RandomReplace2 == 2) {
        var max = 3 + 1; var min = 2;
        var replace = R.split("")[Math.floor(Math.random() * R.split("").length)]
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),replace)
    } else if (RandomReplace2 == 3 || RandomReplace2 == 4 || RandomReplace2 == 5) {
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

    var Transform = ""

    var RandomTranslate = (Math.floor(Math.random() * Math.floor(10)) + 1)
    if (RandomTranslate == 5) {
        var max = 50 + 1; var min = -50;
        Transform += "translateX(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    } else if (RandomTranslate == 6) {
        var max = 50 + 1; var min = -30;
        Transform += "translateY(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    }

    var RandomScale = (Math.floor(Math.random() * Math.floor(10)) + 1)
    if (RandomScale == 5) {
        var max = 150 + 1; var min = 10;
        Transform += "scaleX(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    } else if (RandomScale == 6) {
        var max = 150 + 1; var min = 10;
        Transform += "scaleY(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    }

    var RandomSkew = (Math.floor(Math.random() * Math.floor(10)) + 1)
    if (RandomSkew == 5) {
        var max = 40 + 1; var min = -40;
        Transform += "skewX(" + Math.floor(Math.random() * (max - min) + min) + "deg) ";
    } else if (RandomSkew == 6) {
        var max = 10 + 1; var min = -10;
        Transform += "skewY(" + Math.floor(Math.random() * (max - min) + min) + "deg) ";
    }

    var RandomRotate = (Math.floor(Math.random() * Math.floor(10)) + 1)
    if (RandomRotate == 5) {
        var max = 30 + 1; var min = -30;
        Transform += "rotateZ(" + Math.floor(Math.random() * (max - min) + min) + "deg) ";
    }

    UL.style.transform = Transform

    await delay(1);
    UL.innerHTML = "23"
    UL.style.color = "#fff"
    UL.style.transform = "none";
    UL.style.fontFamily = "Share-TechMono"
    UL.style.cursor = "pointer"
    UL.onclick = () => {location.href = "/votv"}
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
    //if (document.body.id == "404" && !location.href.endsWith(".html")) {location.href = (location.href + ".html")};
})