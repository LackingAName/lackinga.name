const delay = ms => new Promise(res => setTimeout(res, ms))
var Nav
var Level = 1

window.onload = function() {
    $("html").css("overflow-x", "hidden")

    var Favicon = top.document.createElement("link")
    Favicon.rel = "icon"
    Favicon.href = "/favicon.ico"
    Favicon.type = "image/x-icon"
    top.document.head.append(Favicon)

    setInterval(ULGlitch,50)
    if (document.body.id == "index") {LoadUser()}
    //if (document.body.id == "404" && !location.href.endsWith(".html")) {location.href = (location.href + ".html")};

    if (document.cookie.includes("level")) {Level = Number(document.cookie.split("=")[1])}
    RefreshNavbar(-1)
    $(this).on("keypress",function(Input) {if (Input.key == "w") {LevelUp()} else if (Input.key == "s") {LevelDown()}})
}

// functions
function LevelUp() {
    if (Nav[Level + 1] == null) {return}
    Level += 1
    RefreshNavbar(1)
}
function LevelDown() {
    if (Nav[Level - 1] == null) {return}
    Level -= 1
    RefreshNavbar(-1)
}

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

async function RefreshNavbar(Dir) {
    document.cookie = "level=" + Level
    if (document.getElementById("nav").innerHTML != "") {
        $("#nav").children().each(function() {
            if (this.nodeName == "DIV" || this.nodeName == "P") {return}
            this.style.transform = "translateY(calc(" + Dir + " * 30px))"
        })
        await delay(100);
        $("#nav").children().each(function() {
            this.remove()
        })
    }

    $.getJSON("/nav/nav.json",function(data) {
        $.each(data[Level], function(key, value) {
            if (key == "index") {
                var div = document.createElement("div")
                div.onclick = () => {location.href = value}
                div.className = "item"
                document.getElementById("nav").append(div)

                var img = document.createElement("img")
                img.src = "/images/lackingnamesthatb-0.png"
                img.className = "item"
                div.append(img)
                /*
                var dropdown = document.createElement("div")
                dropdown.className = "dropdown"
                div.append(dropdown)

                $.each(data[1].index, function(key, value) {
                    var a = document.createElement("a")
                    a.href = value
                    a.innerHTML = key
                    dropdown.append(a)
                })*/
            } else {
                var a = document.createElement("a")
                a.href = value
                a.innerHTML = key
                a.className = "item"
                if (Nav) {a.style.transform = "translateY(calc(" + (Dir * -1) + " * 30px))"}
                document.getElementById("nav").append(a)
            }
        })

        var up = document.createElement("p")
        up.innerHTML = "⮝"
        up.className = "item arrow"
        up.onclick = () => {LevelUp()}
        document.getElementById("nav").append(up)
        var down = document.createElement("p")
        down.innerHTML = "⮟"
        down.className = "item arrow"
        down.onclick = () => {LevelDown()}
        document.getElementById("nav").append(down)

        Nav = data
    })

    await delay(100);
    $("#nav").children().each(function() {
        this.style.transform = "translateY(0px)"
    })
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