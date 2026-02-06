document.addEventListener("DOMContentLoaded", function () {
	const Container = document.getElementById("Container");

	const Search = window.location.search;
	if (Search.length == 0) {
		Container.innerHTML = "<p>what</p>"
		return;
	}

	const Title = Search.substring(1, Search.length)

    $.getJSON("json/" + Title + ".json", function (JSON) {
		document.title = Title + " devlog"
        document.getElementById("iam2").innerHTML = JSON.iam2;
		document.getElementById("iam3").innerHTML = JSON.iam3;

		var LastDate;
		var DateIndex = 1;

        $.each(JSON.Logs, function (_, Data) {
			if (LastDate == Data.Date) DateIndex++;
			else DateIndex = 1;
			LastDate = Data.Date;
			
			const EntryContainer = document.createElement("div");
			EntryContainer.className = "LogEntry";
			{
				const EntryDate = document.createElement("p");
				EntryDate.innerHTML = Data.Date;
				EntryContainer.appendChild(EntryDate);

				if (Data.Images > 1) {
					for (I = 0; I < Data.Images; I++) {
						const EntryImage = document.createElement("img");
						EntryImage.src = "/images/vrchat/" + Title + "/dev/" + Data.Date + "_" + DateIndex + (I + 10).toString(36) + ".webp";
						EntryContainer.appendChild(EntryImage);
					}
				} else {
					const EntryImage = document.createElement("img");
					EntryImage.src = "/images/vrchat/" + Title + "/dev/" + Data.Date + "_" + DateIndex + ".webp";
					EntryContainer.appendChild(EntryImage);
				}

				const EntryParagraph = document.createElement("p");
				EntryParagraph.innerHTML = Data.Paragraph;
				EntryContainer.appendChild(EntryParagraph);
			}
			Container.appendChild(EntryContainer);
        });
    }).fail(function() {
		Container.innerHTML = "<p>what</p>"
	});
});