let Container;

document.addEventListener("DOMContentLoaded", function () {
    let Grid = document.getElementsByClassName("nongrid")[0];
    Container = document.getElementById("Container");

    $.getJSON("/json/non.json", function (JSON) {
        document.getElementById("nonCount").innerHTML = (Object.keys(JSON).length - 16).toString().padStart(4, "0");

        $.each(JSON, function (_, Data) {
            if (Data.Separator) {
				// create grid label
				const Label = document.createElement("div");
				{
					Label.style.color = "#fff";
					Label.style.textAlign = "center";
					Label.style.fontSize = "64px";
					Label.style.marginTop = "80px";
					Label.innerHTML = Data.Separator;
					Container.appendChild(Label);
				}

				// set to new grid
				Grid = document.createElement("div");
				Grid.className = "nongrid";
				Container.appendChild(Grid);

				return;
			}

			const Fav = Data.Favorite ? "fav" : "";

			const nonContainer = document.createElement("div");
			{
				const nonImage = document.createElement("img");
				nonImage.className = Fav;
				nonImage.setAttribute("onclick", "window.open(src,'_blank');");
				nonImage.src = Data.Image;
				nonContainer.appendChild(nonImage);

				nonContainer.innerHTML += Data.Name + "<br>" + Data.Date + "<br>";

				const Credits = document.createElement("span")
				Credits.style.cursor = "pointer";
				Credits.addEventListener("click", function () { CreditsPopup(Data.Credits); });
				{
					const CreditsLabel = document.createElement("b");
					CreditsLabel.innerHTML = "view credits";
					Credits.appendChild(CreditsLabel);
				}
				nonContainer.appendChild(Credits);

				if (Data.Base) {
					const Base = document.createElement("span")
					Base.style.cursor = "pointer";
					Base.addEventListener("click", function () { window.open(Data.Image.slice(0, -5) + "base.webp", "_blank") })
					{
						const BaseLabel = document.createElement("b");
						BaseLabel.innerHTML = "view base";
						Base.appendChild(BaseLabel);
					}
					nonContainer.appendChild(Base);
				}
			}
			Grid.appendChild(nonContainer);
        });
    });
});

function CreditsPopup(JSON) {
	let Credits = "";
	$.each(JSON, function (Author, Creations) {
		Credits += (Author + "<br>");

		if (Creations.length == 0) return;
		$.each(Creations, function (_, Creation) {
			Credits += ("&nbsp;&nbsp;&nbsp;&nbsp;" + Creation + "<br>");
		});
	});

    const Popup = document.createElement("div");
    Popup.id = "Popup";
    Popup.addEventListener("click", function () { Popup.remove(); });
    {
        const Box = document.createElement("div");
        Box.className = "Box";
        Box.innerHTML += Credits;
        Box.addEventListener("click", function (Event) { Event.stopPropagation(); });
        Popup.appendChild(Box);
    }
    Container.appendChild(Popup);
}