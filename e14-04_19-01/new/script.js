const data = [
  {
    title: "palona",
    info: [
      { name: "Arabica", cost: "4" },
      { name: "Arabusta", cost: "7" },
      { name: "Liberica", cost: "8" },
      { name: "Robusta", cost: "5" },
      { name: "Stenophylla", cost: "13" }
    ]
  },
  {
    title: "mielona",
    info: [
      { name: "Arabusta", cost: "5" },
      { name: "Excelsa", cost: "11" },
      { name: "Liberica", cost: "3" }
    ]
  }
];
const select = document.querySelector("select");
const radio = document.querySelectorAll("input[type=radio]");
const input = document.querySelector("input[type=text]");
const result = document.querySelector("p");

// Przypisanie elementom z radio funkcjonalnosci po kliknieciu
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener("click", v => {
    // Usuniecie opcji po kliknieciu
    while (select.hasChildNodes()) {
      select.removeChild(select.lastChild);
    }
    // Pobranie wartosci przyciku
    const radioValue = v.target.value;
    // Pobranie odpowiednich danych z tablicy
    const filteredData = data.filter(e => {
      return e.title === radioValue;
    });
    // Dodanie zaktualizowanych opcji
    filteredData[0].info.forEach(e => {
      option = document.createElement("option");
      option.value = e.name;
      option.textContent = e.name;
      select.appendChild(option);
    });
    // Wykonanie funkcji
    calcCost();
  });
}

// Obliczenie kosztow
function calcCost() {
  // Pobranie wprowadzonej wartosci
  const inputValue = input.value;
  // Sprawdzenie ktory radio jest zaznaczony
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      const filteredData = data.filter(e => {
        return e.title === radio[i].value;
      });
      const findCost = filteredData[0].info.findIndex(
        v => v.name === select.value
      );
      // Wykonanie obliczen
      isNaN(inputValue) || inputValue.length === 0
        ? (result.innerText = 0)
        : (result.innerText = filteredData[0].info[findCost].cost * inputValue);
    }
  }
}

input.addEventListener("input", () => {
  calcCost();
});
select.addEventListener("input", () => {
  calcCost();
});
