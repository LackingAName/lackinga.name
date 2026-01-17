function MouseMove(Event, Container, Content) {
    const Mouse = {X: Event.clientX, Y: Event.clientY};
    const Client = {Width: Container.clientWidth, Height: Container.clientHeight};
    const Rot = {
        X: ((Container.getBoundingClientRect().top - Mouse.Y) / Client.Height) + 0.5,
        Y: ((Mouse.X - Container.getBoundingClientRect().left) / Client.Width) - 0.5
    };

    Content.style.transform = `rotateX(${Rot.X * 10}deg) rotateY(${Rot.Y * 10}deg)`;
}

function MouseLeave(Content) {
    Content.style.transform = "";
}

document.addEventListener("DOMContentLoaded", function () {
    const Grid = document.getElementsByClassName("LanguageGrid")[0];
    const Show = document.getElementsByClassName("LanguageGrid")[1];

    $.getJSON("/json/programming.json", function (JSON) {
        $.each(JSON, function (_, Data) {
            const Container = document.createElement("div");
            Container.className = "Language";
            {
                const Content = document.createElement("div");
                Content.className = "Content";
                if (Data.Know.substring(0, 1) === "y") Content.style.background = "#11221167";
                else if (Data.Know.substring(0, 1) === "n") Content.style.background = "#22111167";
                else Content.style.background = "#22221167";
                {
                    const Name = document.createElement("h3");
                    {
                        Name.innerHTML = Data.Name;
                        Content.appendChild(Name);
                    }
                    const Image = document.createElement("img");
                    {
                        Image.src = "/images/programming/" + Data.Image;
                        Content.appendChild(Image);
                    }
                    const Words = document.createElement("p");
                    {
                        Words.innerHTML = Data.Words;
                        Content.appendChild(Words);
                    }
                }
                Container.addEventListener("mousemove", function (Event) { MouseMove(Event, Container, Content); });
                Container.addEventListener("mouseleave", function () { MouseLeave(Content); });
                Container.appendChild(Content);
            }
            Grid.appendChild(Container);

            if (Data.Show) {
                const ShowContainer = Container.cloneNode(true);
                const ShowContent = ShowContainer.getElementsByClassName("Content")[0];
                ShowContainer.addEventListener("mousemove", function (Event) { MouseMove(Event, ShowContainer, ShowContent); });
                ShowContainer.addEventListener("mouseleave", function () { MouseLeave(ShowContent); });
                ShowContent.style.background = "#22222267";
                Show.appendChild(ShowContainer);
            }
        });
    });
});