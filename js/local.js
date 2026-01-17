const Delay = ms => new Promise(Handler => setTimeout(Handler, ms));

// main
document.addEventListener("DOMContentLoaded", function () {
    setInterval(ULGlitch, 50);

    $.getJSON("/json/nav.json", function (Data) {
        const nav = document.getElementById("nav");

        $.each(Data[0], function (Key, Value) {
            if (Key === "index") {
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
            nav.prepend(a);
        });

        const DropdownItem = document.createElement("div");
        DropdownItem.className = "Item";
        DropdownItem.innerHTML = "🞃";
        nav.prepend(DropdownItem);

        const Dropdown = document.createElement("div");
        Dropdown.className = "Dropdown";
        DropdownItem.prepend(Dropdown);

        $.each(Data[1], function (Key, Value) {
            const a = document.createElement("a");
            a.href = Value;
            a.innerHTML = Key;
            Dropdown.prepend(a);
        });
    });
});

let DoULGlitch = false;
let ULGlitchDebounce = false;
const R = "`\'\"&:;@#[]<>^_*/\\0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const ULGlitch = async () => {
    if (!DoULGlitch || ULGlitchDebounce || !document.getElementById("UserLabel")) return;

    const UL = document.getElementById("UserLabel");

    if (Math.floor(Math.random() * Math.floor(2)) !== 1) return;
    ULGlitchDebounce = true;

    // ik this code is atrocious

    let Max;
    let Min;
    let Replace;

    for (let I = 0; I < 2; I++) {
        const RandomReplace = Math.floor(Math.random() * Math.floor(6)) + 1;

        if (RandomReplace === 2) {
            Max = 3 + 1;
            Min = 2;
            Replace = R.split("")[Math.floor(Math.random() * R.split("").length)];
            UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (Max - Min) + Min).toString(), Replace);
        } else if (RandomReplace === 3 || RandomReplace === 4 || RandomReplace === 5) {
            Max = 3 + 1;
            Min = 2;
            UL.innerHTML = UL.innerHTML.replace(Math.floor(Math.random() * (Max - Min) + Min).toString(), "?");
        }
    }

    const RandomColor = Math.floor(Math.random() * Math.floor(6)) + 1;
    if (RandomColor === 2) {
        Max = 90 + 1;
        Min = 70;
        UL.style.color = "hsl(0,100%," + Math.floor(Math.random() * (Max - Min) + Min) + "%)";
    } else if (RandomColor === 3) UL.style.color = "#888";
    else if (RandomColor === 4) UL.style.color = "#aaa";

    let Transform = "";

    const RandomTranslate = Math.floor(Math.random() * Math.floor(10)) + 1;
    if (RandomTranslate === 5) {
        Max = 50 + 1;
        Min = -50;
        Transform += "translateX(" + Math.floor(Math.random() * (Max - Min) + Min) + "%) ";
    } else if (RandomTranslate === 6) {
        Max = 50 + 1;
        Min = -30;
        Transform += "translateY(" + Math.floor(Math.random() * (Max - Min) + Min) + "%) ";
    }

    const RandomScale = Math.floor(Math.random() * Math.floor(10)) + 1;
    if (RandomScale === 5) {
        Max = 150 + 1;
        Min = 10;
        Transform += "scaleX(" + Math.floor(Math.random() * (Max - Min) + Min) + "%) ";
    } else if (RandomScale === 6) {
        Max = 150 + 1;
        Min = 10;
        Transform += "scaleY(" + Math.floor(Math.random() * (Max - Min) + Min) + "%) ";
    }

    const RandomSkew = Math.floor(Math.random() * Math.floor(10)) + 1;
    if (RandomSkew === 5) {
        Max = 40 + 1;
        Min = -40;
        Transform += "skewX(" + Math.floor(Math.random() * (Max - Min) + Min) + "deg) ";
    } else if (RandomSkew === 6) {
        Max = 10 + 1;
        Min = -10;
        Transform += "skewY(" + Math.floor(Math.random() * (Max - Min) + Min) + "deg) ";
    }

    const RandomRotate = Math.floor(Math.random() * Math.floor(10)) + 1;
    if (RandomRotate === 5) {
        Max = 30 + 1;
        Min = -30;
        Transform += "rotateZ(" + Math.floor(Math.random() * (Max - Min) + Min) + "deg) ";
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
};