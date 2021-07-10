const url = "https://marysose2020.herokuapp.com";

document.addEventListener("DOMContentLoaded", async() =>{
    const tbody = document.getElementById("scoreBody") as HTMLTableSectionElement;
    const scoreElement = document.getElementById("scoreElement") as HTMLHeadingElement;
    const scoreForm = document.getElementById("scoreForm") as HTMLFormElement;

    scoreForm.addEventListener("submit", submitScore);
    let score = localStorage.getItem("score");
    if(score){
        scoreElement.innerText = score;
    }
    else{
        scoreElement.innerText = "Du hast nicht gespielt.";
    }


    let response = await fetch(url+"/getScores").then((res) => res.json());
    if(response.success && response.scores){
        for(let i = 0; i<response.scores.length;i++){
            let tr = document.createElement("tr");
            let tdPosition = document.createElement("td");
            let tdName = document.createElement("td");
            let tdTime = document.createElement("td");
            tdPosition.innerText = (i+1).toString();
            tdName.innerText = response.scores[i].user;
            tdTime.innerText = response.scores[i].time;
            tr.appendChild(tdPosition);
            tr.appendChild(tdName);
            tr.appendChild(tdTime);
            tbody.appendChild(tr);
        }
    }
    else{
        error("Die Highscore konnte nicht ausgelesen werden.");
    }
});

function error(msg: string){
    console.error(msg);
}

async function submitScore(event: Event){
    event.preventDefault();
    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    let username = formData.get("user");
    if(!formData || !username){
        return;
    }
    let score = localStorage.getItem("score");
    if(!score){
        error("Du musst erst einmal Spielen!");
        return;
    }

    if(!formData.get("user")){
        error("Du musst einen Usernamen eingeben");
        return;
    }
    let params = new URLSearchParams();
    params.set("user", username.toString());
    params.set("time", score);
    let response = await fetch(url+"/submitScore?"+params.toString()).then((res) => res.json());
    if(response.success){
        localStorage.removeItem("score");
        window.location.reload();
    }
    else{
        error("Die Highscore konnte nicht eingeschickt werden.");
    }


}