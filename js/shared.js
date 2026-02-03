document.addEventListener("DOMContentLoaded", function () {
    $("html").css("overflow-x", "hidden");

    const Favicon = top.document.createElement("link");
    Favicon.rel = "icon";
    Favicon.href = "/favicon.ico";
    Favicon.type = "image/x-icon";
    top.document.head.appendChild(Favicon);
});

// math stuff
function Lerp(From, To, Time) {
    return From + (To - From) * Time;
}

function WrapAngle(Angle) {
    return ((Angle % 360) + 360) % 360;
}