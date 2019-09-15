// Funkcjonalnosc przycisku w formularzu
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault(); // Zapobiera odswiezaniu sie strony po form submit

  const input = document.querySelector("input");
  stringStructure(input);
  addBar();
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

function stringStructure(input) {
  console.log(input.value);
}

function addBar() {
  const xLabels = document.querySelectorAll(".x-label text");
  const xLabelComponent = document.querySelector(".x-label");

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

  // Zrobienie miejsca dla nowego text
  for (let i = 0; i < xLabels.length; i++) {
    const x = parseFloat(xLabels[i].getAttribute("x"));
    xLabels[i].setAttribute("x", x + 26);
  }
}

// Dodanie aktualnego roku w miejscu uzytej klasy "current-year"
function addCurrentYear() {
  addCurrentYear = document.querySelectorAll(".current-year");
  for (let i = 0; i < addCurrentYear.length; i++) {
    addCurrentYear[i].textContent = new Date().getFullYear();
  }
}

addCurrentYear();
