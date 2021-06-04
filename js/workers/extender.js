function extendSession(data) {
  fetch("https://s1.thomasricci.dev:2087/reauth/",  {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({
      "id": data.id,
      "session": data.session
    })}).then(response => response.json()).then(response => {
    if(!response.success) {
      postMessage("logout");
    }
  }).catch(console.error);
}

self.onmessage = async function(event) {
  const loop = true;
  while(loop) {
    await new Promise(r => setTimeout(r, 540000));
    extendSession(event.data);
  }
};