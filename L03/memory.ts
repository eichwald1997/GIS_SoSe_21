namespace L02b {

    
/** ---------------- GLOBALE VARIABLEN -------------------------------------------- */


    let feld: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");  //getting form
    feld.addEventListener("change", handlechange);                                  //change function on form
    document.getElementById("start")?.addEventListener("click", los);               //click function on button
 
    let paar: HTMLInputElement = <HTMLInputElement>document.querySelector("input#kartenpaare");             //get HTMl Kartenpaar Element
    let size: HTMLInputElement = <HTMLInputElement>document.querySelector("input#kartengröße");             //get HTML Kartengröße Element
    let backColor: HTMLInputElement = <HTMLInputElement>document.querySelector("input#hintergrundfarbe");   //get HTML Hintergrundfarbe Element
    let fontColor: HTMLInputElement = <HTMLInputElement>document.querySelector("input#schriftfarbe");       //get HTML Schriftfarbe Element
    let fontText: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("title");                //get HTML Überschrift Element
    let preview: HTMLImageElement = <HTMLImageElement>document.getElementById("pre");                       //previwe Image
    let previewText: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("preText");       //previwe Text
    let previewDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("tester");
    
    
    let tempSize: String = "";                                  //Zwischenspeicher für Kartengrößen
    let tempColor: String = "";                                 //Zwischenspeicher für Kartenfarbe
    let cardNr: number = 0;                                     //Speicherort für Kartenpaar-Anzahl
    let activeCards: HTMLElement [] = [];                       //Array Zwischenspeicher zum Abfragen der Karten
    let activeCardsName: string [] = [];
    let doneCards: HTMLElement [] = [];                         //Wichtig für function congrats() Speicherort für alert



    function handlechange(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
       
        if (target.type == "radio") {
            console.log(target.value);
            fontText.style.fontFamily = target.value;
            previewText.style.fontFamily = target.value;
        } 
        
        previewText.style.color = fontColor.value;
        previewDiv.style.backgroundColor = backColor.value;

        if (Number(size.value) == 0) {
                tempSize = "small";
                preview.style.width = "100px";
                preview.style.height = "100px";
            } else if (Number(size.value) == 4) {
                tempSize = "big";
                preview.style.width = "200px";
                preview.style.height = "200px";
            } else {
                tempSize = "medium";
                preview.style.width = "150px";
                preview.style.height = "150px";
            }

        if (target.type == "select-one") {
            if (target.value == "black") {
                tempColor = "FrontBlack";
                preview.src = "Black.jpeg";
            } else if (target.value == "white") {
                tempColor = "FrontWhite";
                preview.src = "White.jpg";
            } else if (target.value == "blue") {
                tempColor = "FrontBlue";
                preview.src = "Blau.jpg";
            } else if (target.value == "red") {
                tempColor = "FrontRed";
                preview.src = "Rot.jpg";
            } else if (target.value == "wählen") {
                preview.src = "tester.jpeg";
            }
        }
         

       
    }
 
    function los(_event: Event): void {
        cardNr = Number(paar.value);
        document.body.style.backgroundColor = backColor.value;
        fontText.style.color = fontColor.value;

        feld.innerHTML = "";
        handleLoad();
    } 
    

    
    function handleLoad(): void {
    //alle Karten
    let memoryArray1: string[] = ["pics/Bird.jpg", "pics/Book.jpg", "pics/Book2.jpg", "pics/Camera.jpg", "pics/Clothes.jpg", "pics/Cola.jpg", "pics/Food.jpg", 
    "pics/Food2.jpg", "pics/Lemon.jpg", "pics/Night.jpg", "pics/Night2.jpg", "pics/Paint.jpg", "pics/Space.jpg", "pics/Street.jpg", "pics/Thankyou.jpg"];
    let memoryArray2: string[] = ["pics/Bird.jpg", "pics/Book.jpg", "pics/Book2.jpg", "pics/Camera.jpg", "pics/Clothes.jpg", "pics/Cola.jpg", "pics/Food.jpg", 
    "pics/Food2.jpg", "pics/Lemon.jpg", "pics/Night.jpg", "pics/Night2.jpg", "pics/Paint.jpg", "pics/Space.jpg", "pics/Street.jpg", "pics/Thankyou.jpg"];
    //benutzerdefinierte Auswahl
    let customArray1: string[] = memoryArray1.slice(0, cardNr);
    console.log(customArray1.length);
    let customArray2: string[] = memoryArray2.slice(0, cardNr);
   
    
    for (let i: number = cardNr; i >= 1; i--) {
            let min: number = 0;
            let max: number = i - 1;
            let zufallBlock1: number = Math.floor(Math.random() * (max - min + 1)) + min;
            let zufallBlock2: number = Math.floor(Math.random() * (max - min + 1)) + min;

            let tempDiv: HTMLElement = document.createElement("div");
            let tempImg: HTMLElement = document.createElement("img");
            tempDiv.classList.add("divboxFront", tempSize.toString(), tempColor.toString());
            tempDiv.appendChild(tempImg);
            tempImg.setAttribute("src", customArray1[zufallBlock1]);
            tempImg.classList.add("back", tempSize.toString());
            tempImg.setAttribute("name", customArray1[zufallBlock1]);
            tempImg.setAttribute("id", customArray1[zufallBlock1]);     //Grund wird unten genannt
            document.getElementById("box")?.appendChild(tempDiv);
            customArray1.splice(zufallBlock1, 1);

            let tempDiv2: HTMLElement = document.createElement("div");
            let tempImg2: HTMLElement = document.createElement("img");
            tempDiv2.classList.add("divboxFront", tempSize.toString(), tempColor.toString());
            tempDiv2.appendChild(tempImg2);
            tempImg2.setAttribute("src", customArray2[zufallBlock2]);
            tempImg2.classList.add("back", tempSize.toString());
            tempImg2.setAttribute("name", customArray2[zufallBlock2]);
            tempImg2.setAttribute("id", customArray2[zufallBlock2]);    //Grund wird unten genannt
            document.getElementById("box")?.appendChild(tempDiv2);
            customArray2.splice(zufallBlock2, 1);
        }

    let pics: NodeListOf<HTMLElement> = document.querySelectorAll("img");
    console.log(pics);
    for (let i: number = 0; i < cardNr * 2; i++) {
        pics[i].addEventListener("click", Frontclass);
    }
    }

    let zeit: number = 0;
    setInterval(timer, 1000);
    
    function timer(): void {
        zeit++;
    }
    
    function Frontclass(_event: Event): void {
    let elem: HTMLElement = <HTMLElement>_event.target; //Hat mir später ne Menge Schwirigkeiten bereitet...
    if (activeCards.length < 2) {
    elem.classList.remove("back");
    elem.classList.add("front");
    elem.removeEventListener("click", Frontclass);
    let nameOf: string = String(elem.getAttribute("name"));
    activeCardsName.push(nameOf);
    activeCards.push(elem);         //Schwierigkeiten: Konnte den Einträge des Arrays in keine sinnvollen Namen geben, 
    }                               // Array vom Typ HTMLElement konnte weder class noch name zugeordnet werden
    console.log(activeCards);
    console.log(activeCardsName);
    
    if (activeCards.length == 2) {
    setTimeout(removeElement1, 800);
    setTimeout(Backclass, 1500);
    }
    }
    

    function Backclass(): void {
    for (let i: number = 0; activeCards.length > i; i++) {
    activeCards[i].classList.remove("front");
    activeCards[i].classList.add("back");
    activeCards[i].addEventListener("click", Frontclass);
    }
    activeCards = [];
    activeCardsName = [];
    }
    

    function removeElement1(): void {                           //Dadurch ist das entstanden... nicht schön aber auch nicht gewollt.
        if (activeCardsName[0] == activeCardsName[1]) {           //Habe keine richtige Lösung gefunden, Id war das einzige was funktioniert hat.
                                                                
            let rem1: NodeListOf<HTMLElement> = document.getElementsByName(activeCardsName[0]);
            console.log(rem1);
            rem1[0].classList.remove("front");
            rem1[0].classList.add("gone");
            rem1[0].parentElement?.classList.remove("divboxFront", tempColor.toString());
            rem1[0].parentElement?.classList.add("divboxBack");
            doneCards.push(rem1[0]);

            rem1[1].classList.remove("front");
            rem1[1].classList.add("gone");
            rem1[1].parentElement?.classList.remove("divboxFront", tempColor.toString());
            rem1[1].parentElement?.classList.add("divboxBack");
            doneCards.push(rem1[1]);

            activeCards = [];
            activeCardsName = [];
            console.log(doneCards.length);
            console.log(cardNr);
        }

        if (doneCards.length == cardNr * 2) {
            alert("You won! Your time was: " + zeit + " sec");
        }

    
    

    
    }    
}
