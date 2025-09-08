const Pages = [
    "/",
    "./",
    "mods",
    "ss",
]

function ToggleSpoilers() {
    document.cookie = "spoilers=" + (1 - Number(document.cookie.split("spoilers=")[1].split("")[0]))
    location.reload()
}

document.addEventListener("DOMContentLoaded",function() {
    RefreshNavbar()
    COOKIE()

    $(this).on("keypress",function(Input) {const Key = Number(Input.key) - 1; if (Pages[Key]) {location.href = Pages[Key]}})
})

function COOKIE() {
    if (!document.cookie.includes("spoilers")) {document.cookie = "spoilers=0"}
    if (document.cookie.includes("spoilers=0")) {
        document.body.style.backgroundImage = null
        if (document.body.classList[0] == "ss") {
            document.body.innerHTML = document.body.innerHTML.split("<div class=\"list\">")[0] + "<p>basically this whole page has spoilers</p>"
        }
    }
    document.documentElement.style.setProperty("--selectedOffset", Math.abs(85 * (Pages.indexOf(document.body.classList[0]))) + "px")
}

function RefreshNavbar() {
    $.getJSON("nav/nav.json",function(data) {
        $.each(data, function(key, value) {
            const div = document.createElement("div")
            div.onclick = () => {location.href = value}
            div.className = "item"
            document.getElementsByClassName("opts")[0].append(div)

            if (key == "root") {
                const img = document.createElement("img")
                img.src = "/images/lackingnamesthatb-1.webp"
                img.className = "item"
                div.append(img)
            } else {
                const p = document.createElement("p")
                p.innerHTML = key
                div.append(p)
            }
        })
    })
}