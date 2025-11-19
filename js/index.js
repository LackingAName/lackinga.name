const Max = 36;
var Index = 0;
var LastState = 0;
var Dragging = false;
var Dragged = false;

var Drag;
var UC;
var UL;
var User;
var UserButton;

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
function Check(URL) {
    return new Promise(Resolve => {
        const Img = new Image();
        Img.addEventListener("load", () => Resolve(true));
        Img.addEventListener("error", () => Resolve(false));
        Img.src = URL;
    });
}

function UserHandler(State, Event) {
    if (LastState == 2 && State == 0 && Event.type == "mouseup") {
        LoadUser(true);
        Dragged = false;
    }

    if (State < 2) Dragging = State == 1;
    if (LastState != 2 && State == 0 && Event.type == "mouseup") LoadUser();
    if (State == 0) {
        Drag.style.display = "none";
        UserButton.style.cursor = "";
    }

    LastState = State;
    DragUpdate(Event.pageX, Event.pageY);
    if (!Dragging || Dragged || State != 2) return;

    if (Event.movementX < 0 && (Index - 1) >= 1) Index -= 1;
    if (Event.movementX > 0 && (Index + 1) <= Max) Index += 1;
    Drag.style.display = "block";
    UserButton.style.cursor = "none";
    Dragged = true;
}

var PrevPos = { x: 0, y: 0 }
var Vel = 0;
var Angle = 0;
function DragUpdate(mX, mY) {
    var Magn = { x: mX - PrevPos.x, y: mY - PrevPos.y }
    Vel = Math.sqrt(Math.abs(Magn.x ** 2) + Math.abs(Magn.y ** 2));

    var T = WrapAngle(Math.atan2(Magn.y, Magn.x) * (180 / Math.PI));
    Angle = WrapAngle(Angle);

    var PrevDiff = WrapAngle(Angle - T);
    Angle = (PrevDiff < 180) ? (Angle - Vel) : (Angle + Vel);
    if (WrapAngle(Angle - T) < 180 != PrevDiff < 180) Angle = T;

    Drag.style.left = (mX - 50) + "px";
    Drag.style.top = (mY - 50) + "px";
    Drag.style.transform = "rotate(" + Angle + "deg)";

    PrevPos.x = mX;
    PrevPos.y = mY;
}

function LoadUser(NoRandom) {
    $("#UserContainer").children().each(function() {
        if (this.className != "Detection") {return};
        this.remove();
    });

    if (!NoRandom) {
        Index = (Math.floor(Math.random() * Math.floor(Max)) + 1);
        if (Index == UL.innerHTML && (Index + 1) <= Max) Index += 1;
        else if (Index == UL.innerHTML && (Index - 1) >= 1) Index -= 1;
    }

    User.src = "images/User/Input/" + Index + ".webp";
    UL.innerHTML = Index;

    for (let I = 0; I < 10; I++) {
        Check("images/User/Output/" + Index + "-" + I + ".webp").then(Value => {
            if (!Value) return;
            var Detection = document.createElement("img");
            Detection.className = "Detection";
            Detection.src = "images/User/Output/" + Index + "-" + I + ".webp";
            Detection.style = "animation: Delay " + Math.floor(Math.random() * (50 - 5) + 5) / 100 + "s linear forwards;";
            UC.append(Detection);
        });
    }

    DoULGlitch = (Index == 23);
    UL.style.color = "#fff";
    UL.style.transform = "none";
    UL.style.fontFamily = "Roboto Mono";
    UL.style.cursor = null;
    UL.onclick = null;
}