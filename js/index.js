window.onload = function() {
    var Favicon = top.document.createElement("link");
    Favicon.rel = "icon";
    Favicon.href = "/favicon.ico";
    Favicon.type = "image/x-icon";
    top.document.getElementsByTagName("head")[0].appendChild(Favicon);
}

document.addEventListener("DOMContentLoaded", (event) => {
    $("html").css("overflow-x", "hidden");

    $(function() {
        $("#naviframe").load("/html/navigation.html");
    });

    if (document.body.id == "index") {
        document.getElementById("User").src = "images/User/" + (Math.floor(Math.random() * Math.floor(23)) + 1) + ".png";
    };

    if (document.body.id == "vrchat") {
        const rn = new Date();
        const Today = new Date(rn.getFullYear(),rn.getMonth(),rn.getDate());
        const Release = new Date(2024,11,18);
        function Wednesday3000(Days,StartDate,EndDate) {
            var DaysCount = 1 + Math.round((EndDate - StartDate) / (24 * 3600 * 1000));
            var Total = function(A,B) {
                return A + Math.floor((DaysCount + (StartDate.getDay() + 6 - B) % 7) / 7);};
            return Days.reduce(Total,0);
        }
        document.getElementById("world3glimpse").innerHTML = "next".repeat(Wednesday3000([3],Today,Release)) + "wednesday";
    };

    if (document.body.id == "secret") {
        document.getElementById("bg").volume = 0.25;
    };
});