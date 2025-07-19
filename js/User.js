var Max = 32;
var Index = 0;
var LastState = 0;
var Dragging = false;
var Dragged = false;

var Drag;
var UC;
var UL;
var User;
window.onload = function() {
    if (document.body.id == "index") {
        LoadUser()

        Drag = document.createElement("img")
        Drag.src = "images/User/Drag.webp"
        Drag.style.width = "100px"
        Drag.style.height = "100px"
        Drag.style.position = "absolute"
        Drag.style.display = "none"
        document.body.append(Drag)
    }
}
document.addEventListener("DOMContentLoaded",() => {
    if (document.body.id == "index") {
        var UserButton = document.getElementById("UserButton")
        UserButton.addEventListener("mousedown",(Event) => UserHandler(1,Event))
        UserButton.addEventListener("mousemove",(Event) => UserHandler(2,Event))
        UserButton.addEventListener("mouseup",(Event) => UserHandler(0,Event))
        UserButton.addEventListener("mouseleave",(Event) => UserHandler(0,Event))

        UC = document.getElementById("UserContainer");
        UL = document.getElementById("UserLabel");
        User = document.getElementById("User");
    }
})

function UserHandler(State,Event) {
    if (LastState == 2 && State == 0 && Event.type == "mouseup") {LoadUser(true);Dragged = false;}

    if (State < 2) Dragging = State == 1
    if (LastState != 2 && State == 0 && Event.type == "mouseup") LoadUser();
    if (State == 0) Drag.style.display = "none";

    DragUpdate(Event.pageX,Event.pageY,Event.movementX,Event.movementY);
    LastState = State;

    if (!Dragging || Dragged || State != 2) return;

    if (Event.movementX < 0 && (Index - 1) >= 1) Index -= 1;
    if (Event.movementX > 0 && (Index + 1) <= Max) Index += 1;
    Drag.style.display = "block";
    Dragged = true;
}

var LastAngle = 0;
function DragUpdate(x,y,vx,vy) {
    if (vx == 0 && vy == 0) return;

    var Deg = Math.atan2(vy,vx) * (180 / Math.PI);
    if (Deg < 0) Deg += 360;
    var AngleDiff = Deg - LastAngle;
    if (AngleDiff > 180) AngleDiff -= 360;
    if (AngleDiff < -180) AngleDiff += 360;
    LastAngle += AngleDiff * 0.3;

    Drag.style.left = (x - 50) + "px";
    Drag.style.top = (y - 50) + "px";
    Drag.style.transform = "rotate(" + LastAngle + "deg)";
}

function LoadUser(NoRandom) {
    $("#UserContainer").children().each(function() {
        if (this.className != "Detection") {return};
        this.remove();
    })

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
        })
    }

    DoULGlitch = (Index == 23);
    UL.style.color = "#fff";
    UL.style.transform = "none";
    UL.style.fontFamily = "Roboto Mono";
    UL.style.cursor = null;
    UL.onclick = null;
}