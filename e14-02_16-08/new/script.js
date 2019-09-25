let highestLength = 15;
let highestYLable = 15;
const gridMaxHeight = 77.981468;

// Funkcjonalnosc przycisku w formularzu
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault(); // Zapobiera odswiezaniu sie strony po form submit

  const input = document.querySelector("input");
  highestLength =
    input.value.length > highestLength ? input.value.length : highestLength;

  updateYLabels();
  addXLabels();
  addBar(inputStructure(input));
});

function updateYLabels() {
  const yLabels = document.querySelectorAll("#y-label text tspan");
  const y =
    highestLength % 3 === 0
      ? Math.floor(highestLength / 3)
      : Math.floor(highestLength / 3) + 1;
  highestYLable = y * (yLabels.length - 1); // Aktualizacja maksymalnego yLabels
  for (let i = 0; i < yLabels.length; i++) {
    yLabels[i].textContent = y * i;
  }
}

// Funkcjonalnosc przycisku pokarz/ukryj
const show = document.querySelector("#show");
show.addEventListener("click", e => {
  const input = document.querySelector("input");
  const tag = e.target;
  const dataShow = tag.dataset.show; // Atrybuty znacznika, ktore maja w nazwie data-, np. data-show
  // Atrybuty znacznikow nie przechowuja boolean dla tego false jest zapisane "false"
  if (dataShow === "false" || dataShow === undefined) {
    tag.textContent = "ukryj";
    tag.dataset.show = true;
    input.type = "text";
  } else {
    tag.textContent = "pokarz";
    tag.dataset.show = false;
    input.type = "password";
  }
});

// Funkcjonalnosc przycisku w legendzie
// Wyczyszczenie wykresu
const clearChart = document.querySelector(".legend button");
clearChart.addEventListener("click", () => {
  const xLabels = document.querySelector("#x-label");
  const chartBars = document.querySelector("#chart-bars");
  // Usuniecie etykiet i slupkow
  while (xLabels.lastChild || chartBars.lastChild) {
    xLabels.lastChild ? xLabels.removeChild(xLabels.lastChild) : null;
    chartBars.lastChild ? chartBars.removeChild(chartBars.lastChild) : null;
  }
});

// Aktualizacja szerokosci chartGrid zaleznie od szerokosci okna
function changeChartGridWidth() {
  const maxChartWidth = document.querySelector(".chart").clientWidth;
  const chartGrid = document.querySelectorAll(".chart-grid path");

  for (let i = 0; i < chartGrid.length; i++) {
    const dimensions = chartGrid[i].getAttribute("d").split(" "); // Rozdzielenie wymiarow na poszczegolne elementy
    dimensions[3] = maxChartWidth * 0.264 - 10; // Modyfikacja dlugosci. Przy ustawieniu viewBox="0 0 38.776803 88.647065", 0.264 przeliczając to około 1px, okolo 10 to odleglo dwucyfrowego y-label
    chartGrid[i].setAttribute("d", dimensions.join(" "));
  }
}
window.onresize = changeChartGridWidth; // Uruchomienie funkcji w czasie zmiany szerokosci okna

function inputStructure(input) {
  const v = input.value;
  const digits = v.replace(/[^0-9]/g, "").length; // ^ - wybiera przeciwienstow, np. [^0-9] z "12abc" zwroci abc
  const letters = v.replace(/[^a-ząćęłńóśźż]/gi, "").length; // g- find all matches, i - case insensitive
  const rest = v.length - (digits + letters);

  return { numOfRest: rest, numOfLetters: letters, numOfDigits: digits };
}

// Dodanie xLable i przesuniecie poprzednich etykiet
function addXLabels() {
  const xLabels = document.querySelectorAll("#x-label text");
  const xLabelComponent = document.querySelector("#x-label");
  // Do tworzenia elementow svg nalezy uzywac "createElementNS", createElement nie zadziala
  const createText = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  const createTspan = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "tspan"
  );

  createTspan.textContent = xLabels.length + 1;
  createText.appendChild(createTspan);
  createText.setAttribute("y", 88.647018);
  createText.setAttribute("x", 24.009666);
  xLabelComponent.insertBefore(createText, xLabelComponent.firstChild);
  // Przesuniecie starych text
  for (let i = 0; i < xLabels.length; i++) {
    const x = parseFloat(xLabels[i].getAttribute("x"));
    xLabels[i].setAttribute("x", x + 26);
  }
}

// Dodane slupka wykresu
function addBar(inputStructure) {
  const chartBars = document.querySelector("#chart-bars");
  const createG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const chartVariables = {
    numOfDigits: { className: "numbers" },
    numOfLetters: { className: "letters" },
    numOfRest: { className: "characters" }
  };
  // yStartingPoint to jest punkt, od ktorek jest rysowany slupek (z gory do dolu!)
  // 79.834364 - 0% 53.7822789 - 33%, 1.7822789 - 100%
  let yStartingPoint = 79.834364;
  let separation = 0; // Pierwszy odstep jest rowny 0, pozniej 1.1

  Object.keys(inputStructure).forEach(e => {
    numOf = inputStructure[e]; // Ilosc, np. wartosc numOfLetters
    smallBarHeight = (gridMaxHeight / highestYLable) * numOf; // Wyliczenie jaka powinien miec maly slupek wysokosc
    yStartingPoint -= smallBarHeight; // Dostosowanie poczatkowego punktu w odniesieniu do wysokosci
    const createRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    createRect.setAttribute("class", chartVariables[e].className);
    createRect.setAttribute("rx", 0.62);
    createRect.setAttribute("ry", 0.62);
    createRect.setAttribute("width", 5.7665434);
    createRect.setAttribute(
      "height",
      smallBarHeight === 0 ? 0 : smallBarHeight - separation
    );
    createRect.setAttribute("x", 22.581184);
    createRect.setAttribute("y", yStartingPoint);
    createRect.setAttribute("data-value", numOf);
    createG.appendChild(createRect);
    separation = numOf === 0 && separation === 0 ? 0 : 1.1;
  });
  chartBars.appendChild(createG);
}

function updateBars() {
  const chartBars = document.querySelectorAll("#chart-bars g");
  for (let i = 0; i < chartBars.length; i++) {
    const bar = chartBars[i];
    for (let i = 0; i < bar.length; i++) {
      console.log(bar[i]);
    }
    console.log(bar);
  }
}
updateBars();

// Dodanie aktualnego roku w miejscu uzytej klasy "current-year"
function addCurrentYear() {
  addCurrentYear = document.querySelectorAll(".current-year");
  for (let i = 0; i < addCurrentYear.length; i++) {
    addCurrentYear[i].textContent = new Date().getFullYear();
  }
}
addCurrentYear();
