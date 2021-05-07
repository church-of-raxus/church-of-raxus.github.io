
///------------------------------------Quote chooser------------------------------------///
const quotes = ["I'd never name a baby 'mommy milkers'", "People don’t think it be like it is, but it do.", "You’ll always be my little pogchamp", "Everyone asks if they’re my little pogchamp, but no one ever asks how their server dad is doing", "You're walking in the Caledon Fairgrounds<br>There's no one around and your phone is dead<br>Out of the corner of your eye you spot him:<br>Kan Gao.<br>He's following you, about 30 mooses back.<br>He gets down on all fours and starts shouting probably copyrighted attack warcries<br>He's galloping at you.<br>Kan Gao.<br>You're looking for the World’s Smallest Ferris Wheel but you're all turned around<br>He's almost upon you now<br>And you can see there's blood on his face<br>My God, there's tentacles too!<br>Running for your life (from Kan Gao)<br>He's brandishing long cat (holding a knife)<br>Cthulhu tentacles spreading out (from Kan Gao)<br>Indie Game developer Kan Gao", "In 2003, I was camping in the Chilean mountains. After an Ayahuasan ceremony, a Canadian group camped near by. A man, who I had never met before, snuck into my tent mid-trip and made me write out my hallucinations on alpaca wool, using macaroni, Capri-Suns, and raccoon feces. His name was Kan Gao and my name is Quincy.", "Breasts are temporary. Rome is forever.", /*"Nothing wrong with me loving Moony's mommy milkers","I want Pure to take a picture of my crotch.", "Mommy milkers", */ "Pure-chan...<br>Nyaaa", "*lights a cigarette*", "I’ll show you true pain.", "If humans are innately good, why aren’t all shopping carts returned?", "The worst part of growing up is when no one gets excited if you poop in the toilet."];
const ads = ["School's out! Get kids in the Church for summertime fun in the Church of Raxus.", "You Don't Have To Change Who You Are To Join The Church Of Raxus.", "Learn why Raxus Anode has been named a Freebird Leader in more Analyst Reports than any other Freebird.", "The #1 Discord Server to meet new friends."];
const quote = Math.floor(Math.random() * Math.floor(quotes.length));
//console.log(quote)
document.getElementById("quote").innerHTML = `"${quotes[quote]}"`;
///-------------------------------------------------------------------------------------///

///------------------------------------------Cookie Coins-------------------------------///
let coins = Cookies.get("RaxusCoinCount");
if(typeof coins == "undefined")
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
Cookies.set("RaxusCoinCount", coins);
document.getElementById("coin-count").innerHTML = `${coins} (unofficial) Raxus Coins`;
///-------------------------------------------------------------------------------------///