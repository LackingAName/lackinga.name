const Max = 37;
let Index = 0;

let Drag;
let UC;
let UL;
let User;
let UserButton;

// main
document.addEventListener("DOMContentLoaded",function() {
    Drag = document.createElement("img");
    Drag.src = "images/User/Drag.webp";
    Drag.style.width = "100px";
    Drag.style.height = "100px";
    Drag.style.position = "absolute";
    Drag.style.display = "none";
    document.body.append(Drag);

    UC = document.getElementById("UserContainer");
    UL = document.getElementById("UserLabel");
    User = document.getElementById("User");

    UserButton = document.getElementById("UserButton");
    UserButton.addEventListener("mousedown", (Event) => UserHandler(1, Event));
    UserButton.addEventListener("mousemove", (Event) => UserHandler(2, Event));
    UserButton.addEventListener("mouseup", (Event) => UserHandler(0, Event));
    UserButton.addEventListener("mouseleave", (Event) => UserHandler(0, Event));

    LoadUser();
});

// functions
function Validate(URL) {
    return new Promise(Resolve => {
        const Img = new Image();
        Img.addEventListener("load", () => Resolve(true));
        Img.addEventListener("error", () => Resolve(false));
        Img.src = URL;
        Img.remove();
    });
}

let LastState = 0;
let Dragging = false;
let Dir = 0;

function UserHandler(State, Event) {
    // mouse up after dragging
    if (LastState === 2 && State === 0 && Event.type === "mouseup") {
        if ((Dir < 0) && (Index - 1) >= 1) Index -= 1;
        if ((Dir > 0) && (Index + 1) <= Max) Index += 1;
        LoadUser(false);
    }

    // mouse up after clicking normally
    if (LastState !== 2 && State === 0 && Event.type === "mouseup")
        LoadUser();

    // mouse up or mouse leave
    if (State === 0) {
        Drag.style.display = "none";
        UserButton.style.cursor = "";
    }

    if (State < 2) Dragging = State === 1;

    LastState = State;
    DragUpdate(Event.pageX, Event.pageY);
    if (!Dragging || State !== 2) return;

    Dir = Lerp(Dir, Math.min(Math.max(Event.movementX - Event.movementY, -1), 1), 0.1);
    Drag.style.display = "block";
    UserButton.style.cursor = "none";
}

const PrevPos = {x: 0, y: 0};
let Vel = 0;
let Angle = 0;

function DragUpdate(mX, mY) {
    const Magn = {x: mX - PrevPos.x, y: mY - PrevPos.y};
    Vel = Math.sqrt(Math.abs(Magn.x ** 2) + Math.abs(Magn.y ** 2));

    const Deg = WrapAngle(Math.atan2(Magn.y, Magn.x) * (180 / Math.PI));
    Angle = WrapAngle(Angle);

    const PrevDiff = WrapAngle(Angle - Deg);
    Angle = (PrevDiff < 180) ? (Angle - Vel) : (Angle + Vel);
    if (WrapAngle(Angle - Deg) < 180 !== PrevDiff < 180) Angle = Deg;

    Drag.style.left = (mX - 50) + "px";
    Drag.style.top = (mY - 50) + "px";
    Drag.style.transform = "rotate(" + Angle + "deg)";

    PrevPos.x = mX;
    PrevPos.y = mY;
}

function LoadUser(Random = true) {
    $("#UserContainer").children().each(function() {
        if (this.className !== "Detection") {return}
        this.remove();
    });

    if (Random) {
        Index = (Math.floor(Math.random() * Math.floor(Max)) + 1);
        if (Index === UL.innerHTML && (Index + 1) <= Max) Index += 1;
        else if (Index === UL.innerHTML && (Index - 1) >= 1) Index -= 1;
    }

    User.src = "images/User/Input/" + Index + ".webp";
    UL.innerHTML = Index;

    for (let I = 0; I < 10; I++) {
        Validate("images/User/Output/" + Index + "-" + I + ".webp").then(Value => {
            if (!Value) return;
            const Detection = document.createElement("img");
            Detection.className = "Detection";
            Detection.src = "images/User/Output/" + Index + "-" + I + ".webp";
            Detection.style = "animation: Delay " + Math.floor(Math.random() * (50 - 5) + 5) / 100 + "s linear forwards;";
            UC.append(Detection);
        });
    }

    DoULGlitch = (Index === 23);
    UL.style.color = "#fff";
    UL.style.transform = "none";
    UL.style.fontFamily = "Roboto Mono";
}