async function make_news() {

  let id = 0;

  await fetch("./propaganda/news.json").then((response) => response.json().then(async function(data) {
    for(const post of data.posts) {
      let uuid = id++;
      await new Promise(r => setTimeout(r, 100));
      let color = rgb_shade(-0.1, post.color);
      const article = document.createElement("div");
      article.setAttribute("class", "card text-center animate__animated animate__bounceIn");
      article.setAttribute("style", `background-color: ${color};`);
      const title = document.createElement("p");
      title.setAttribute("class", "card-header");
      title.setAttribute("style", `background-color: ${post.color}; font-size: 20px; color: white;`);
      const titleContent = document.createTextNode(post.header);
      const author = document.createElement("div");
      author.setAttribute("class", "author-text");
      author.innerText = post.author;
      const img = document.createElement("img");
      img.setAttribute("src", `data:image/png;base64,${post.image.base64}`);
      img.setAttribute("alt", `${post.author}'s post image`);
      img.setAttribute("class", "card-img-top m-auto pt-2 pb-2");
      img.setAttribute("style", "max-height: 500px; max-width: 85%;");
      title.appendChild(titleContent);
      title.appendChild(author);

      article.appendChild(title);
      article.appendChild(img);
      // eslint-disable-next-line no-prototype-builtins
      if(post.hasOwnProperty("body")) {
        const body = document.createElement("div");
        body.setAttribute("class", "card-body");
        body.setAttribute("style", `background-color: ${post.color};`);
        if(post.body.title !== "" || post.body.description !== "")
        {
          const dropdown = document.createElement("div");
          dropdown.setAttribute("class", "dropdown");
          const button = document.createElement("button");
          button.setAttribute("class", "btn btn-outline-light dropdown-toggle btn-block");
          button.setAttribute("style", `background-color: ${post.color}`);
          button.setAttribute("type", "button");
          button.setAttribute("data-toggle", "collapse");
          button.setAttribute("href", `#${uuid}`);
          button.setAttribute("aria-haspopup", "true");
          button.setAttribute("aria-expanded", "false");
          const buttonContent = document.createTextNode(post.body.title);
          const collapse = document.createElement("div");
          collapse.setAttribute("id", uuid.toString());
          collapse.setAttribute("class", "collapse");
          const description = document.createElement("div");
          description.setAttribute("class", "card card-body text-white");
          description.setAttribute("style", `background-color: ${color}; font-size: 20px;`);
          const descriptionContent = document.createTextNode(post.body.description);
          description.appendChild(descriptionContent);
          collapse.appendChild(description);
          button.appendChild(buttonContent);
          dropdown.appendChild(button);
          dropdown.appendChild(collapse);
          body.appendChild(dropdown);
        }
        article.appendChild(body);
      }
      document.getElementById("posts").appendChild(article);
    }
  }));

}

async function choose_quote()
{
  const quotes = ["I'd never name a baby 'mommy milkers'", "People don’t think it be like it is, but it do.", "You’ll always be my little pogchamp", "Everyone asks if they’re my little pogchamp, but no one ever asks how their server dad is doing", "You're walking in the Caledon Fairgrounds<br>There's no one around and your phone is dead<br>Out of the corner of your eye you spot him:<br>Kan Gao.<br>He's following you, about 30 mooses back.<br>He gets down on all fours and starts shouting probably copyrighted attack warcries<br>He's galloping at you.<br>Kan Gao.<br>You're looking for the World’s Smallest Ferris Wheel but you're all turned around<br>He's almost upon you now<br>And you can see there's blood on his face<br>My God, there's tentacles too!<br>Running for your life (from Kan Gao)<br>He's brandishing long cat (holding a knife)<br>Cthulhu tentacles spreading out (from Kan Gao)<br>Indie Game developer Kan Gao", "In 2003, I was camping in the Chilean mountains. After an Ayahuasan ceremony, a Canadian group camped near by. A man, who I had never met before, snuck into my tent mid-trip and made me write out my hallucinations on alpaca wool, using macaroni, Capri-Suns, and raccoon feces. His name was Kan Gao and my name is Quincy.", "Breasts are temporary. Rome is forever.", /*"Nothing wrong with me loving Moony's mommy milkers","I want Pure to take a picture of my crotch.", "Mommy milkers", */ "Pure-chan...<br>Nyaaa", "*lights a cigarette*", "I’ll show you true pain.", "If humans are innately good, why aren’t all shopping carts returned?", "The worst part of growing up is when no one gets excited if you poop in the toilet."];
  const ads = ["School's out! Get kids in the Church for summertime fun in the Church of Raxus.", "You Don't Have To Change Who You Are To Join The Church Of Raxus.", "Learn why Raxus Anode has been named a Freebird Leader in more Analyst Reports than any other Freebird.", "The #1 Discord Server to meet new friends."];
  document.getElementById("quote").innerHTML = `"${quotes[Math.floor(Math.random() * Math.floor(quotes.length))]}"`;
}

async function update_coins()
{ 
  let coins = localStorage.getItem("RaxusCoinCount");
  if(coins === "NaN")
  {
    coins = 0;
  }
  coins = parseInt(coins) + 1;
  localStorage.setItem("RaxusCoinCount", coins);
  document.getElementById("coin-count").innerHTML = `${coins} Rax Coins`;
}

async function load()
{
  var checkbox = document.querySelector("input[name=agreement]");
  var agree_button = document.createElement("a");
  agree_button.setAttribute("class", "btn btn-primary");
  agree_button.setAttribute("onclick", "agree_check()");

  agree_button.setAttribute("type", "button");
  agree_button.setAttribute("href", "https://discord.com/api/oauth2/authorize?client_id=822120932944117770&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2F&response_type=code&scope=identify");
  agree_button.innerText = "Continue";

  var agree_section = document.getElementById("agree_section");

  checkbox.addEventListener("change", function() {
    if(this.checked) {
      agree_section.appendChild(agree_button);
    }else{
      agree_section.removeChild(agree_button);
    }
  });

  const fragment = new URLSearchParams(window.location.search.slice(1));
  const code = fragment.get("code");
    
  if(code) 
  { 
    fetch("https://s1.thomasricci.dev:2087/login/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({"code": `${code}`, })
    })
      .then(result => result.json())
      .then(response => 
      {
        console.log(response);
        if(!("error" in response))
        {
          const { id, avatar, session } = response;
          const { username, discriminator } = response;
  
          var usernameField = document.getElementById("profile_button");
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
  
          var createPostTab = document.getElementById("nav-submit-tab"); 
          var shopTab = document.getElementById("nav-shop-tab"); 

          createPostTab.classList.remove("disabled");
          shopTab.classList.remove("disabled");

          usernameField.setAttribute("href", "http://127.0.0.1:5500/");

          fetch("https://s1.thomasricci.dev:2087/coin/get/", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify({"id": `${id}`, })
          })
            .then(result => result.json())
            .then(response =>
            {
              document.getElementById("coin-count").innerHTML = `${response.balance} Rax Coins`;
            });

          fetch("https://s1.thomasricci.dev:2087/coin/set/", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify({"id": `${id}`, "session": `${session}`, "positive": true, "change": 1})
          })
            .then(result => result.json())
            .then(response =>
            {
              console.log(response);
              if(response.success)
              {
                document.getElementById("coin-count").innerHTML = `${response.newBal} Rax Coins`; 
              }
            });

          //To not get authentication error on reload because of the parameter saved in the URL
          window.history.replaceState({}, document.title, "/");
          
        }
      }).catch(console.error);
  }

  var disclaimer = document.getElementById("disclaimer");

  if(localStorage.getItem("agreed_with") === "1.0")
  {
    disclaimer.style.setProperty("display", "none");
  }

  await choose_quote();
  await update_coins();
  await make_news();
}

const rgb_shade=(p, c) =>
{
  var i=parseInt, r=Math.round, [a, b, c, d]=c.split(","), P=p<0, t=P?0:255*p, P=P?1+p:1-p;
  return `rgba${d?"a(":"("}${r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)},${r(i(b)*P+t)},${r(i(c)*P+t)}${d?`,${d}`:", 0.7)"}`;
};

const get_profile_picture=(user_id, image_id) =>
{
  return "https://cdn.discordapp.com/avatars/" + `${user_id}` + "/" +  `${image_id}` + ".png";
};