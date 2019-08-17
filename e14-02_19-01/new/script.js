const allFilds = document.querySelectorAll("input, select");
const textFild = document.querySelector("p");

for (let i = 0; i < allFilds.length; i++) {
  allFilds[i].addEventListener("input", e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "fontSize":
        textFild.style.fontSize = value + "%";
        break;
      case "fontStyle":
        if (value === "italic") {
          textFild.style.fontStyle = value;
        } else {
          textFild.style.fontStyle = "normal";
          textFild.style.fontWeight = value;
        }
        break;
      case "color":
        textFild.style.color = "#" + value;
        break;
      case "insertedText":
        textFild.innerText = value;
        break;
    }
  });
}
