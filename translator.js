let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let translateBtn = document.querySelector(".translate");
let exchangeBtn = document.querySelector(".exchange");
let icons = document.querySelectorAll(".row i");
let selectTag = document.querySelectorAll("select");
selectTag.forEach((element, id)=> {
  for(const country_code in countries){
    let selected;
    if(id == 0 && country_code == "en-GB"){
      selected = "selected";
    }else if(id == 1 && country_code == "ar-SA"){
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
    element.innerHTML += option;
  }
});

exchangeBtn.addEventListener("click", ()=>{
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;
  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", ()=>{
  let text = fromText.value;
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;
  if(!text) return;
  toText.setAttribute("placeholder", "Translating...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(response => response.json()).then(data => {
    toText.value = data.responseData.translatedText;
    toText.setAttribute("placeholder", "Translating...");
  })
})

icons.forEach(icon => {
  icon.addEventListener("click", ({target})=>{
    if(target.classList.contains("fa-copy")){
      if(target.id == "from"){
        navigator.clipboard.writeText(fromText.value);
      }else{
        navigator.clipboard.writeText(toText.value);
      }
    }else{
      let utterance;
      if(target.id == "from"){
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      }else{
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  })
});