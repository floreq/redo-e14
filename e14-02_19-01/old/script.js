const sampleText = document.querySelector("#sampleText");
const buttons = document.querySelectorAll("button");
const inputSize = document.querySelector("#inputSize");
const selectStyle = document.querySelector("#selectStyle");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", v => {
    sampleText.style.color = v.target.value;
    sampleText.style.fontSize = inputSize.value + "%";
    sampleText.style.fontStyle = selectStyle.value;
  });
}
