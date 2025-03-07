var Pages = [
    "/",
    "./",
    "mods",
    "ss",
]

function ToggleSpoilers() {
    document.cookie = "spoilers=" + (1 - Number(document.cookie.split("spoilers=")[1].split("")[0]))
    location.reload()
}

window.onload = function() {
    $("html").css("overflow-x", "hidden")

    var Favicon = top.document.createElement("link")
    Favicon.rel = "icon"
    Favicon.href = "/favicon.ico"
    Favicon.type = "image/x-icon"
    top.document.head.appendChild(Favicon)

    RefreshNavbar()
    COOKIE()

    $(this).on("keypress",function(Input) {var Key = Number(Input.key) - 1; if (Pages[Key]) {location.href = Pages[Key]}})
}

function COOKIE() {
    if (!document.cookie.includes("spoilers")) {document.cookie = "spoilers=0"}
    if (document.cookie.includes("spoilers=0")) {
        document.body.style.backgroundImage = null
        if (document.body.id == "ss") {
            document.body.innerHTML = document.body.innerHTML.split("<div class=\"list\">")[0] + "<p>basically this whole page has spoilers</p>"
        }
    }
    document.documentElement.style.setProperty("--selectedOffset", Math.abs(85 * (Pages.indexOf(document.body.id))) + "px")
}

function RefreshNavbar() {
    $.getJSON("nav/nav.json",function(data) {
        $.each(data, function(key, value) {
            var div = document.createElement("div")
            div.onclick = () => {location.href = value}
            div.className = "item"
            document.getElementsByClassName("opts")[0].append(div)

            if (key == "root") {
                var img = document.createElement("img")
                img.src = "/images/lackingnamesthatb-1.png"
                img.className = "item"
                div.append(img)
            } else {
                var p = document.createElement("p")
                p.innerHTML = key
                div.append(p)
            }
        })
    })
}