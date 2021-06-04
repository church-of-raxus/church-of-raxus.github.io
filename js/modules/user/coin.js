import logout from "./logout.js";

export function setCoins(id, session) {
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
      if(response.success) {
        document.getElementById("coin-count").innerHTML = `${response.newBal} Rax Coins`;
      }else{
        logout();
      }
    });
}