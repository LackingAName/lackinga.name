document.addEventListener("DOMContentLoaded",function() {
    const Grid = document.getElementsByClassName("nongrid")[0];

    $.getJSON("/json/non.json", function(JSON) {
        $.each(JSON, function(_, Data) {
            const Base = Data.Base ? Add(Data.Image.slice(0,-5) + "base.webp") : "";
            const Fav = Data.Favorite ? "fav" : "";

            const Div = document.createElement("div");
                const Image = document.createElement("img");
                Image.className = Fav;
                Image.setAttribute("onclick","window.open(src,'_blank');")
                Image.src = Data.Image;
            Div.appendChild(Image);
            Div.innerHTML += Data.Name + "<br>" + Data.Date + "<br>" + Data.Credits + Base;
            Grid.appendChild(Div);
        });
    });
})

function Add(URL) {
    return "<br><span style='cursor:pointer;' onclick=\"window.open('" + URL + "','_blank');\"><b>view base</span>";
}