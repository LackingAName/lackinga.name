const Delay = ms => new Promise(Handler => setTimeout(Handler, ms));

// main
document.addEventListener("DOMContentLoaded",function() {
    setInterval(ULGlitch, 50);

    $.getJSON("/json/nav.json",function(Data) {
        const nav = document.getElementById("nav");

        $.each(Data[0], function(Key, Value) {
            if (Key == "index") {
                const div = document.createElement("div");
                    div.onclick = () => location.href = Value;
                    div.className = "Index Item";
                nav.prepend(div);

                const img = document.createElement("img");
                    img.src = "/images/lackingnamesthatb-0.webp";
                div.prepend(img);
                
                return;
            }

            const a = document.createElement("a");
                a.href = Value;
                a.innerHTML = Key;
                a.className = "Item";
            nav.prepend(a)
        })

        const DropdownItem = document.createElement("div");
            DropdownItem.className = "Item";
            DropdownItem.innerHTML = "🞃";
        nav.prepend(DropdownItem);

        const Dropdown = document.createElement("div");
            Dropdown.className = "Dropdown";
        DropdownItem.prepend(Dropdown);

        $.each(Data[1], function(Key, Value) {
            const a = document.createElement("a");
            a.href = Value;
            a.innerHTML = Key;
            Dropdown.prepend(a);
        })
    })
})

var DoULGlitch = false;
var ULGlitchDebounce = false;
const R = "`\'\"&:;@#[]<>^_*/\\0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const ULGlitch = async () => {
    if (!DoULGlitch || ULGlitchDebounce || !document.getElementById("UserLabel")) return;

    var UL = document.getElementById("UserLabel");
    
    if (Math.floor(Math.random() * Math.floor(2)) != 1) return;
    ULGlitchDebounce = true;
    // ik this code is attrocious

    var RandomReplace1 = (Math.floor(Math.random() * Math.floor(6)) + 1);
    if (RandomReplace1 == 2) {
        var max = 3 + 1; var min = 2;
        var replace = R.split("")[Math.floor(Math.random() * R.split("").length)];
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),replace);
    } else if (RandomReplace1 == 3 || RandomReplace1 == 4 || RandomReplace1 == 5) {
        var max = 3 + 1; var min = 2;
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),"?");
    }
    var RandomReplace2 = (Math.floor(Math.random() * Math.floor(6)) + 1)
    if (RandomReplace2 == 2) {
        var max = 3 + 1; var min = 2;
        var replace = R.split("")[Math.floor(Math.random() * R.split("").length)];
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),replace);
    } else if (RandomReplace2 == 3 || RandomReplace2 == 4 || RandomReplace2 == 5) {
        var max = 3 + 1; var min = 2;
        UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (max - min) + min).toString(),"?");
    }

    var RandomColor = (Math.floor(Math.random() * Math.floor(6)) + 1);
    if (RandomColor == 2) {
        var max = 90 + 1; var min = 70;
        UL.style.color = "hsl(0,100%," + Math.floor(Math.random() * (max - min) + min) + "%)";
    } else if (RandomColor == 3) {
        UL.style.color = "#888";
    } else if (RandomColor == 4) {
        UL.style.color = "#aaa";
    }

    var Transform = "";

    var RandomTranslate = (Math.floor(Math.random() * Math.floor(10)) + 1);
    if (RandomTranslate == 5) {
        var max = 50 + 1; var min = -50;
        Transform += "translateX(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    } else if (RandomTranslate == 6) {
        var max = 50 + 1; var min = -30;
        Transform += "translateY(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    }

    var RandomScale = (Math.floor(Math.random() * Math.floor(10)) + 1);
    if (RandomScale == 5) {
        var max = 150 + 1; var min = 10;
        Transform += "scaleX(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    } else if (RandomScale == 6) {
        var max = 150 + 1; var min = 10;
        Transform += "scaleY(" + Math.floor(Math.random() * (max - min) + min) + "%) ";
    }

    var RandomSkew = (Math.floor(Math.random() * Math.floor(10)) + 1);
    if (RandomSkew == 5) {
        var max = 40 + 1; var min = -40;
        Transform += "skewX(" + Math.floor(Math.random() * (max - min) + min) + "deg) ";
    } else if (RandomSkew == 6) {
        var max = 10 + 1; var min = -10;
        Transform += "skewY(" + Math.floor(Math.random() * (max - min) + min) + "deg) ";
    }

    var RandomRotate = (Math.floor(Math.random() * Math.floor(10)) + 1);
    if (RandomRotate == 5) {
        var max = 30 + 1; var min = -30;
        Transform += "rotateZ(" + Math.floor(Math.random() * (max - min) + min) + "deg) ";
    }

    UL.style.transform = Transform;

    await Delay(1);
    UL.innerHTML = "23";
    UL.style.color = "#fff";
    UL.style.transform = "none";
    UL.style.fontFamily = "Share-TechMono";
    UL.style.cursor = "pointer";
    UL.onclick = () => location.href = "/votv";
    ULGlitchDebounce = false;

    if (DoULGlitch && !ULGlitchDebounce && document.getElementById("UserLabel")) return;
    UL.style.color = "#fff";
    UL.style.transform = "none";
    UL.style.fontFamily = "Roboto Mono";
    UL.style.cursor = null;
    UL.onclick = null;
    UL.innerHTML = Index;
}