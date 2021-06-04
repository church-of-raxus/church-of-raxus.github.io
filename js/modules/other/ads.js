export default function() {
  //generate randomized copy and background color
  const copies = ["School's out! Get kids in the Church for summertime fun in the Church of Raxus.", "You Don't Have To Change Who You Are To Join The Church Of Raxus.", "Learn why Raxus Anode has been named a Freebird Leader in more Analyst Reports than any other Freebird.", "The #1 Discord Server to meet new friends."];
  const colors = ["9c27b0", "ff4081", "f44336", "2196f3", "4caf50"];
  let copy = Math.floor(Math.random() * copies.length);
  let color = Math.floor(Math.random() * colors.length);
  copy = copies[copy];
  color = colors[color];
  //generate ad container
  const ad = document.createElement("div");
  ad.setAttribute("class", "alert text-center animate__animated animate__bounceIn");
  ad.setAttribute("style", `background-color: #${color}; margin-top: 15px;`);
  //generate copy
  const copyContainer = document.createElement("p");
  copyContainer.setAttribute("class", "text-center text-white");
  copyContainer.setAttribute("style", "font-size: 20px;");
  const copyTextContainer = document.createTextNode(copy);
  //generate button
  const button = document.createElement("a");
  button.setAttribute("class", "btn btn-flat text-center text-white");
  button.setAttribute("href", "https://discord.gg/XaucJHh8J2");
  const callToAction = document.createTextNode("Join Now");
  //build ad
  copyContainer.appendChild(copyTextContainer);
  button.appendChild(callToAction);
  ad.appendChild(copyContainer);
  ad.appendChild(button);
  //add ad to posts
  document.getElementById("posts").appendChild(ad);
}