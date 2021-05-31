"use strict";
function ritorna() {
  // ritorniamo in pagina 1 senza salvare
  window.location.href = "index.html";
}
function salva() {
  let _texts = document.getElementsByTagName("input");
  let json = localStorage.getItem("bookstore_json");
  console.log(json);
  let jsonVet = JSON.parse(json);
  console.log(jsonVet);
  let libroNovo = {
    category: "",
    title: "",
    authors: [""],
    language: "",
    year: "",
    price: "",
  };
  let iAutore = 0;
  for (let i = 0; i < _texts.length; i++) {
    switch (_texts[i].id) {
      case "txtTitolo":
        libroNovo.title = _texts[i].value;
        break;
      case "txtAutore":
        libroNovo.authors[iAutore] = _texts[i].value;
        iAutore++;
        break;
      case "txtCategoria":
        libroNovo.category = _texts[i].value;
        break;
      case "txtLingua":
        libroNovo.language = _texts[i].value;
        break;
      case "txtAnno":
        libroNovo.year = _texts[i].value;
        break;
      case "txtPrezzo":
        libroNovo.price = _texts[i].value;
        break;
	}
  }
  alert("Dati Salvati Correttamente")
  jsonVet.push(libroNovo);
  console.log(jsonVet);
  JSON.stringify(jsonVet);
  localStorage.setItem("bookstore_json", JSON.stringify(jsonVet));
  window.location.href = "index.html";
}