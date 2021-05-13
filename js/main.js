async function make_news() {

  await fetch("./propaganda/news.json").then((response) => response.json().then(async function(data) {
    for(const post of data.posts) {
      let uuid = post.id;
      await new Promise(r => setTimeout(r, 100));
      let animation = post.animation.name;
      if(animation.length > 0) animation = `animate__${animation}`;
      let color = rgb_shade(-0.1, post.color);
      const article = document.createElement("div");
      article.setAttribute("class", `card text-center animate__animated ${animation} animate__delay-${post.animation.delay}s`);
      article.setAttribute("style", `background-color: ${color};`);
      const title = document.createElement("p");
      title.setAttribute("class", "card-header");
      title.setAttribute("style", `background-color: ${post.color}; font-size: 20px; color: white;`);
      const titleContent = document.createTextNode(post.header);
      const img = document.createElement("img");
      img.setAttribute("src", post.image.path);
      img.setAttribute("alt", post.image.alt);
      img.setAttribute("class", "card-img-top m-auto pt-2 pb-2");
      img.setAttribute("style", `width: ${post.image.size}%;`);
      title.appendChild(titleContent);
      article.appendChild(title);
      article.appendChild(img);
      // eslint-disable-next-line no-prototype-builtins
      if(post.hasOwnProperty("body")) {
        const body = document.createElement("div");
        body.setAttribute("class", "card-body");
        body.setAttribute("style", `background-color: ${post.color};`);
        if(post.body.title != "" || post.body.description != "")
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
        else
        {

        }
        article.appendChild(body);
      }
      document.getElementById("posts").appendChild(article);
    }
  }));

}

const rgb_shade=(p,c)=>
{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgba"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:", 0.7)");
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
  if(coins == "NaN")
  {
    coins = 0;

    //var header = document.getElementById("header");
    //var congratulation_msg = document.createElement("div");
    //congratulation_msg.classList.add("alert");
    //congratulation_msg.classList.add("alert-success");
    //congratulation_msg.innerHTML = "Congratulations on your first (unofficial) Raxus Coin! These are used for somewhat reason we don't know";
    //congratulation_msg.setAttribute("role", "alert");
    //header.appendChild(congratulation_msg);
  }
  coins = parseInt(coins) + 1;
  localStorage.setItem("RaxusCoinCount", coins);
  document.getElementById("coin-count").innerHTML = `${coins} (unofficial) Raxus Coins`;
}

async function load()
{
  choose_quote();
  update_coins();
  make_news();
}

async function links()
{
  let links = localStorage.getItem('Links');
  let titles = localStorage.getItem('Titles');
  if(links == "NaN")
  {
      localStorage.setItem('Links', 'https://www.raxus-church.ml ');
      localStorage.setItem('Titles', 'Raxus-Church ');
  }

  let form = document.getElementById("formforlink");
  form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();


      var title = document.forms[0][0].value;
      var address = document.forms[0][1].value;

      localStorage.setItem('Links', localStorage.getItem('Links') + `${address}` + " ");
      localStorage.setItem('Titles', localStorage.getItem('Titles') + `${title}` + " ");
      form.submit();
  });

  let linkes = links.split(" ");
  let titlees = titles.split(" ");
  for(let i = 0; i < linkes.length; i++)
  {
      document.getElementById("linkstorage").innerHTML += '<a style="font-size: 21px; margin-left: 10px;" class="badge badge-info" href="' + `${linkes[i]}` + '">' + `${titlees[i]}` + '</a>';   
  }
}