const delay = ms => new Promise(res => setTimeout(res, ms))
var Nav
var Level = 1

window.onload = function() {
    $("html").css("overflow-x", "hidden")

    var path = document.location.pathname.split("/").pop().split(".")
    if (document.location.hostname == "localhost" && path.length == 1 && path[0].length > 0) {location.href += ".html"}

    var Favicon = top.document.createElement("link")
    Favicon.rel = "icon"
    Favicon.href = "/favicon.ico"
    Favicon.type = "image/x-icon"
    top.document.head.append(Favicon)

    if (document.body.id == "index") {
        LoadUser()

        var UserButton = document.getElementById("UserButton")
        UserButton.addEventListener("mousedown",(Event) => UserHandler(1,Event))
        UserButton.addEventListener("mousemove",(Event) => UserHandler(2,Event))
        UserButton.addEventListener("mouseup",(Event) => UserHandler(0,Event))
        UserButton.addEventListener("mouseleave",(Event) => UserHandler(0,Event))

        /*Drag = document.createElement("img")
        Drag.src = "images/User/Drag.webp"
        Drag.style.width = "100px"
        Drag.style.height = "100px"
        Drag.style.position = "absolute"
        Drag.style.display = "none"
        document.body.append(Drag)
        UserCH = document.getElementById("UserCH").children[0]*/
    }
    if (document.cookie.includes("level")) {Level = Number(document.cookie.split("level=")[1].split("")[0])}

    RefreshNavbar(-1)
    setInterval(ULGlitch,50)

    $(this).on("keypress",function(Input) {if (Input.key == "w") {LevelUp()} else if (Input.key == "s") {LevelDown()}})
}

// functions
function Check(URL) {
    return new Promise(Resolve => {
        var Img = new Image()
        Img.addEventListener("load",() => Resolve(true))
        Img.addEventListener("error",() => Resolve(false))
        Img.src = URL
    })
} 

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

var CH = 1
var MouseState = 0
var Drag
var UserCH
function UserHandler(State,Event) {
    //if (State < 2) MouseState = State
    if (State == 0 && Event.type == "mouseup") LoadUser()
    /*if (State == 0) Drag.style.display = "none"

    DragUpdate(Event.pageX,Event.pageY,Event.movementX,Event.movementY)

    if (MouseState != 1 || State != 2) return
    if (Event.movementX < 0 && (CH - 1) >= 1) CH -= 1
    if (Event.movementX > 0 && (CH + 1) <= 2) CH += 1
    Drag.style.display = "block"
    UserCH.style.transform = "translateX(-" + 65 * (CH - 1) + "%)"*/
}
var LastAngle = 0
function DragUpdate(x,y,vx,vy) {
    if (vx == 0 && vy == 0) return

    var Deg = Math.atan2(vy,vx) * (180 / Math.PI)
    if (Deg < 0) Deg += 360
    var AngleDiff = Deg - LastAngle
    if (AngleDiff > 180) AngleDiff -= 360
    if (AngleDiff < -180) AngleDiff += 360
    LastAngle += AngleDiff * 0.3

    Drag.style.left = (x - 50) + "px"
    Drag.style.top = (y - 50) + "px"
    Drag.style.transform = "rotate(" + LastAngle + "deg)"
}
function LoadUser() {
    var UC = document.getElementById("UserContainer")
    var UL = document.getElementById("UserLabel")
    var User = document.getElementById("User")

    $("#UserContainer").children().each(function() {
        if (this.className != "Detection") {return}
        this.remove()
    })

    var Max = CH == 1 ? 30 : 3
    var Random = (Math.floor(Math.random() * Math.floor(Max)) + 1)
    if (Random == UL.innerHTML && (Random + 1) <= Max) Random += 1
    else if (Random == UL.innerHTML && (Random - 1) >= 1) Random -= 1

    User.src = "images/User/CH" + CH + "/Input/" + Random + ".webp"
    UL.innerHTML = Random

    for (let I = 0; I < 10; I++) {
        Check("images/User/CH" + CH + "/Output/" + Random + "-" + I + ".webp").then(Value => {
            if (!Value) return
            var Detection = document.createElement("img")
            Detection.className = "Detection"
            Detection.src = "images/User/CH" + CH + "/Output/" + Random + "-" + I + ".webp"
            Detection.style = "animation: Delay " + Math.floor(Math.random() * (50 - 5) + 5) / 100 + "s linear forwards;"
            UC.append(Detection)
        })
    }

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
        await delay(100)
        $("#nav").children().each(function() {
            if (this.nodeName == "DIV" || this.nodeName == "P") {return}
            this.remove()
        })
    }

    $.getJSON("/nav/nav.json",function(data) {
        $.each(data[Level], function(key, value) {
            if (key == "index") {
                if (document.getElementById("nav").innerHTML.includes("b-0")) {return}
                var div = document.createElement("div")
                div.onclick = () => {location.href = value}
                div.className = "item"
                document.getElementById("nav").append(div)

                var img = document.createElement("img")
                img.src = "/images/lackingnamesthatb-0.webp"
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

        Nav = data

        if (document.getElementById("nav").innerHTML.includes("arrow")) {return}
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
    })

    await delay(100)
    $("#nav").children().each(function() {
        this.style = null
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

    await delay(1)
    UL.innerHTML = "23"
    UL.style.color = "#fff"
    UL.style.transform = "none"
    UL.style.fontFamily = "Share-TechMono"
    UL.style.cursor = "pointer"
    UL.onclick = () => {location.href = "/votv"}
    ULGlitchDebounce = false
}