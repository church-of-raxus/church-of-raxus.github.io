export function showTerms() {
  //gen terms
  let checkbox = document.querySelector("input[name=agreement]");
  let agree_button = document.createElement("a");
  agree_button.setAttribute("class", "btn btn-primary");
  agree_button.setAttribute("onclick", "agree_check()");
  agree_button.setAttribute("type", "button");
  agree_button.setAttribute("href", "https://discord.com/api/oauth2/authorize?client_id=822120932944117770&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Ffrontend%2F&response_type=code&scope=identify");
  agree_button.innerText = "Continue";
  let agree_section = document.getElementById("agree_section");
  //toggle terms on aggree
  checkbox.addEventListener("change", function() {
    if(this.checked) {
      agree_section.appendChild(agree_button);
    }else{
      agree_section.removeChild(agree_button);
    }
  });
}

export function hideTerms() {
  //stop displaying terms if user aggreed to them
  const disclaimer = document.getElementById("disclaimer");
  if(localStorage.getItem("agreed_with") === "1.0") {
    disclaimer.style.setProperty("display", "none");
  }
}