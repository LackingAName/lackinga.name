document.addEventListener("DOMContentLoaded",() => {
    $(".nongrid div").each(function() {
        var This = this
        var URL = This.children[0].src.slice(0,-5) + "base.webp"

        var Req = new XMLHttpRequest();
        Req.open("GET",URL,false)
        Req.send()

        if (Req.responseText.includes("WEBP")) This.innerHTML += "<br><span style='cursor:pointer;' onclick=\"window.open('" + URL + "','_blank');\"><b>view base</span>"
    });
})