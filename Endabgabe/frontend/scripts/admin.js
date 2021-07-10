"use strict";
const url = "https://marysose2020.herokuapp.com";
document.addEventListener("DOMContentLoaded", async () => {
    const imagesDiv = document.getElementById("images");
    const updateForm = document.getElementById("updateImageForm");
    updateForm.addEventListener("submit", update);
    let response = await fetch(url + "/getImages").then((res) => res.json());
    console.log(response);
    if (response.success && response.images) {
        for (let image of response.images) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            let checkbox = document.createElement("input");
            checkbox.value = image.source;
            checkbox.type = "checkbox";
            img.src = image.source;
            img.width = 100;
            img.height = 100;
            checkbox.checked = image.enabled;
            div.appendChild(img);
            div.appendChild(checkbox);
            imagesDiv.appendChild(div);
        }
    }
    else {
        error("Die Bilder konnten nicht ausgelesen werden.");
    }
});
function error(msg) {
    console.error(msg);
}
async function update(event) {
    event.preventDefault(); //prevent reload when submitting form
    let checkboxes = document.querySelectorAll("#updateImageForm input[type=\"checkbox\"]");
    let data = new URLSearchParams();
    let result = [];
    checkboxes.forEach((box) => {
        result.push({ source: box.value, enabled: box.checked });
    });
    data.append("data", JSON.stringify(result));
    let response = await fetch(url + "/updateImages?" + data.toString()).then((res) => res.json());
    if (response.success) {
        window.location.reload();
    }
    else {
        error("Das Aktualisieren der Bilder hat leider nicht geklappt.");
    }
}
//# sourceMappingURL=admin.js.map