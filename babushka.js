// ************** Indhentning af data **************
//Endpoint
const url = "https://babushka-dd8a.restdb.io/rest/menu";

//API-Nøgle
const options = {
  headers: { "x-apikey": "600ec2fb1346a1524ff12de4" },
};

// Global variabel
let retter;

//Henter data fra restdb med fetch funktion
async function hentData() {
  const resspons = await fetch(url, options);
  retter = await resspons.json();
  visRetter();
}

// ************************* Filtrering **************************

// Variabel for vores filter sættes lig med alle.
let filter = "alle";

// Laver en konstant til alle mine filter knapper, ved brug af "querySelectorAll".
const filterKnapper = document.querySelectorAll("nav button");

// Kalder funktionen "filtrerRetter"
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));

// konstant til h2 tekst
const header = document.querySelector("header h2");

function filtrerRetter() {
  // data-attributten fortæller at når der bliver klikket på knapperne, skal den tage udgangspunkt i kategorien.
  filter = this.dataset.kategori;

  // fjerner klassen valgt fra alle
  document.querySelector(".valgt").classList.remove("valgt");

  // tilføjer klassen valgt til kategorierne der bliver klikket på
  this.classList.add("valgt");

  // EventHandler funnktionen gør at h2 overskriften passer til den valgte kategori
  header.textContent = this.textContent;

  // Kalder visRetter på ny, for at implementere filter
  visRetter();
}

// ********************* indhold til loop-funktion **********************

// container, menuen skal indsættes i.
const container = document.querySelector("section");

// template konstant
const template = document.querySelector("template").content;

//loop funktion, som laver klon af template
function visRetter() {
  console.log(retter);
  // Sletter indholdet fra listen (array). Så indholdet ikke bliver ved med at loop igennem, så indholdet ikke bliver ved med at blive vist og bliver på siden.
  container.textContent = "";

  retter.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      console.log("kategori", retter.kategori);
      // Konstant klon
      const klon = template.cloneNode(true);
      klon.querySelector("img").src = "medium/" + ret.billednavn + "-md.jpg";
      klon.querySelector("img").alt = "medium/" + ret.billednavn + "-md.jpg";
      klon.querySelector("h3").textContent = ret.billednavn;
      klon.querySelector("p").textContent = ret.kategori;
      klon.querySelector(".p2").textContent = ret.kortbeskrivelse;
      klon.querySelector(".p3").textContent = "Pris: " + ret.pris + " kr.";
      // Kalder på funktionen visEnkeltRet, for at få mere info, om den ret man klikker på.
      klon
        .querySelector("article")
        .addEventListener("click", () => visEnkeltRet(ret));

      // tilføjer billede, tekster og pris til containeren med appendChild
      container.appendChild(klon);
    }
  });
}

// ******************************** pop-up vinduet *********************************

function visEnkeltRet(retData) {
  console.log(retData);
  const popup = document.querySelector("#popup");
  // For at vise pop-up vinduet, skriver man style.display = flex.
  popup.style.display = "block";
  console.log("flex");
  // Skriver herefter hvad der skal stå i min popup.
  popup.querySelector("img").src = "medium/" + retData.billednavn + "-md.jpg";
  popup.querySelector("img").alt = "medium/" + retData.billednavn + "-md.jpg";
  popup.querySelector("h3").textContent = retData.billednavn;
  popup.querySelector("p").textContent = retData.langbeskrivelse;
}

// Gør det muligt at lukke pop-up vinduet igen
document
  .querySelector("#luk")
  .addEventListener("click", () => (popup.style.display = "none"));

hentData();
