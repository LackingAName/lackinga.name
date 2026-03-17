let TabButtons;
let Grids;

document.addEventListener("DOMContentLoaded", function () {
	TabButtons = document.getElementById("Tabs").getElementsByTagName("button");
	Grids = document.getElementById("Grids");

    Loadnons();
});

function Loadnons() {
	TabButtons[0].className = "Active";
	TabButtons[1].className = "";

	Grids.innerHTML = "";
	let Grid = document.createElement("div");
	Grid.className = "nongrid";
	Grids.appendChild(Grid);

    $.getJSON("/json/non.json", function (JSON) {
		const nonCount = Object.keys(JSON).length - 16; // 16 is the extra data
        document.getElementById("nonCount").innerHTML = nonCount.toString().padStart(4, "0");

		if (nonCount % 2 == 1) { // maintain horizontal order by checking if the count is odd
			// append an empty container to fix it :)
			const nonContainer = document.createElement("div");
			Grid.appendChild(nonContainer);
		}

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
					Grids.appendChild(Label);
				}

				// set to new grid
				Grid = document.createElement("div");
				Grid.className = "nongrid";
				Grids.appendChild(Grid);

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

				if (Data.Credits) {
					const Credits = document.createElement("span")
					Credits.style.cursor = "pointer";
					Credits.addEventListener("click", function () { CreditsPopup(Data.Credits); });
					{
						const CreditsLabel = document.createElement("b");
						CreditsLabel.innerHTML = "view credits";
						Credits.appendChild(CreditsLabel);
					}
					nonContainer.appendChild(Credits);
				}

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
}

function Loadanons() {
	TabButtons[0].className = "";
	TabButtons[1].className = "Active";

	Grids.innerHTML = "";
	let Grid = document.createElement("div");
	Grid.className = "anongrid";
	Grids.appendChild(Grid);

	Grid.innerHTML += "this will look bettr next moths"

    $.getJSON("/json/anon.json", function (JSON) {
        $.each(JSON, function (_, Data) {
			const anonContainer = document.createElement("div");
			{
				for (let I = 0; I < Data.Audio.length; I++) {
					anonContainer.innerHTML += Data.Name[I] + "<br>" + Data.Date[I];

					const anonAudio = document.createElement("audio");
					//anonAudio.className = Fav;
					anonAudio.setAttribute("controls", "");
					anonAudio.src = Data.Audio[I];
					//anonAudio.volume = 0.3;
					anonContainer.appendChild(anonAudio);
				}
			}
			Grid.appendChild(anonContainer);
        });

		// html/js SUCK
		let Audios = Grid.getElementsByTagName("audio");
		for (let I = 0; I < Audios.length; I++) Audios[I].volume = 0.3;
    });
}

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