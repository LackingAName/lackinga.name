document.addEventListener("DOMContentLoaded",function() {
    var Grid = document.getElementsByClassName("nongrid")[0];
    const Container = document.getElementById("Container");

    $.getJSON("/json/non.json", function(JSON) {
        $.each(JSON, function(_, Data) {
            if (Data.Separator) {
                const Label = document.createElement("div");
                    Label.style.color = "#fff";
                    Label.style.textAlign = "center";
                    Label.style.fontSize = "64px";
                    Label.style.marginTop = "80px";
                    Label.innerHTML = Data.Separator;
                Container.appendChild(Label);

                Grid = document.createElement("div");
                    Grid.className = "nongrid";
                Container.appendChild(Grid);

                return;
            }
            const Base = Data.Base ? AddBase(Data.Image.slice(0,-5) + "base.webp") : "";
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
});

function AddBase(URL) {
    return "<br><span style='cursor:pointer;' onclick=\"window.open('" + URL + "','_blank');\"><b>view base</span>";
}