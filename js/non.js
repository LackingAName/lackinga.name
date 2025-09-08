document.addEventListener("DOMContentLoaded",function() {
    $(".nongrid div").each(function() {
        const URL = this.children[0].src.slice(0,-5) + "base.webp";

        const XHR = new XMLHttpRequest();
        XHR.open("GET",URL,true);
        XHR.onload = () => {
            if (XHR.responseText.includes("WEBP")) {
                this.innerHTML += Add(URL);
            }
        }
        XHR.send();
    });
})

function Add(URL) {
    return "<br><span style='cursor:pointer;' onclick=\"window.open('" + URL + "','_blank');\"><b>view base</span>";
}