function SetImage(ImageURL,Element,Type) {
    $.getJSON(ImageURL,async function(Data) {
        var ImageElement = document.getElementById(Element).getElementsByClassName(Type)[0];
        ImageElement.src = Data.versions[Data.versions.length - 1].file.url;
    });
};

document.addEventListener("DOMContentLoaded", (event) => {
    $("html").css("overflow-x", "hidden");

    $(function() {
        $("#naviframe").load("/html/navigation.html");
    });

    if (document.body.id == "404") {
        if (location.href.endsWith(".html") != true) {
            location.href = (location.href + ".html");
        };
    };

    if (document.body.id == "index") {
        document.getElementById("lans").src = "images/lans/" + (Math.floor(Math.random() * Math.floor(16)) + 1) + ".png";
    };

    if (document.body.id == "vrchat") {
        SetImage("https://api.vrchat.cloud/api/1/file/file_0ed03716-b4fc-43af-8d37-b0028d76a085","world1","worldImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_5a108c65-d131-4eff-8479-551c5d3c66e4","world2","worldImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_fef2518b-75fa-43f3-a04d-6d1108f2fdb4","world5","worldImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_6bb692ea-c0a1-4f75-9b96-03949ce5e84b","world8","worldImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_9b2c0af1-8207-44ee-b837-bd051de09c61","world9","worldImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_6fa2893f-ce95-48b4-a747-5e24cbe59a75","world11","worldImg");

        SetImage("https://api.vrchat.cloud/api/1/file/file_0ed03716-b4fc-43af-8d37-b0028d76a085","world1a","worldImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_fef2518b-75fa-43f3-a04d-6d1108f2fdb4","world5a","worldImg");

        SetImage("https://api.vrchat.cloud/api/1/file/file_795c6b4d-b789-4497-9b1f-f35012bc5eec","group1","groupImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_777810fd-998e-4b44-aa62-055b99ff5c3d","group1","groupBanner");
        SetImage("https://api.vrchat.cloud/api/1/file/file_3161c2e9-acde-47a4-bed5-b24c1972006d","group2","groupImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_006ed262-5b0a-42e6-bcda-351d3efc5adf","group2","groupBanner");
        SetImage("https://api.vrchat.cloud/api/1/file/file_43e70f5c-ff76-4d4c-8aa2-645badcc6fff","group3","groupImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_849c8dbb-30eb-4c60-bd6b-c5be1c1f2c8a","group3","groupBanner");
        SetImage("https://api.vrchat.cloud/api/1/file/file_b8e978eb-d8f7-4d85-b3c8-5addfd6b4dcd","group4","groupImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_2f7ce9a4-b1aa-40c9-8e9b-ab174ccd6744","group4","groupBanner");
        SetImage("https://api.vrchat.cloud/api/1/file/file_87ee6437-8ae4-4d91-b065-2d027c6edd6b","group5","groupImg");
        SetImage("https://api.vrchat.cloud/api/1/file/file_c37100d8-6469-4117-ad35-e2c4924e4730","group5","groupBanner");
    };

    if (document.body.id == "secret") {
        document.getElementById("bg").volume = 0.25;
    };
});