import logout from "./logout.js";

export default function() {
  //get auth code from uri
  const fragment = new URLSearchParams(window.location.search.slice(1));
  const code = fragment.get("code");
  if(code) {
    //fetch user data
    fetch("https://s1.thomasricci.dev:2087/login/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({"code": `${code}`, })
    }).then(result => result.json()).then(response => {
      console.log(response);
      if(response.success) {
        //get and save user data into ss
        const { id, avatar} = response;
        const { username, discriminator } = response;
        sessionStorage.setItem("userData", JSON.stringify(response));
        //display user data
        const usernameField = document.getElementById("profile_button");
        usernameField.setAttribute("data-toggle", "dropdown");
        usernameField.removeAttribute("data-target");
        let joindate_display = document.getElementById("joindate_display");
        joindate_display.innerText = `Joined on ${response.join}`;
        let pictureLink = "https://cdn.discordapp.com/avatars/" + `${id}` + "/" +  `${avatar}` + ".png";
        let usernameInfo = document.createTextNode(` ${username}#${discriminator}`);
        let pictureNode = document.createElement("img");
        pictureNode.setAttribute("src", `${pictureLink}`);
        pictureNode.setAttribute("id", "profile-picture");
        usernameField.innerText = ""; // To clear "Login with *whatever*"
        usernameField.appendChild(pictureNode);
        usernameField.appendChild(usernameInfo);
        //give access to secret tabs
        const createPostTab = document.getElementById("nav-submit-tab");
        const shopTab = document.getElementById("nav-shop-tab");
        createPostTab.classList.remove("disabled");
        shopTab.classList.remove("disabled");
        usernameField.setAttribute("href", "http://127.0.0.1:5500/");
        //get and display the user's raxcoin balance
        document.getElementById("coin-count").innerHTML = `${response.bal} Raxcoin`;
        //remove uri from url
        const extender = new Worker("./js/workers/extender.js");
        extender.postMessage(JSON.parse(sessionStorage.getItem("userData")));
        extender.onmessage = function(event) {
          if(event.data === "logout") {
            logout();
          }
        };
      }else{
        window.location.replace(`https://${window.location.host}${window.location.pathname}?loginfailure=true`);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }).catch(console.error);
  }
}