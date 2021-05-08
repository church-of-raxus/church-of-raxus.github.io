async function news() {
  await fetch("./propaganda/news.json").then((response) => response.json().then(async function(data) {
    for(const post of data.posts) {
      let uuid = post.id;
      await new Promise(r => setTimeout(r, 2000));
      let animation = post.animation.name;
      if(animation.length > 0) animation = `animate__${animation}`;
      let color = brightness(post.color, -20);
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
        description.setAttribute("class", "card card-bodynow text-white");
        description.setAttribute("style", `background-color: ${post.color}; font-size: 20px;`);
        const descriptionContent = document.createTextNode(post.body.description);
        description.appendChild(descriptionContent);
        collapse.appendChild(description);
        button.appendChild(buttonContent);
        dropdown.appendChild(button);
        dropdown.appendChild(collapse);
        article.appendChild(dropdown);
      }
      console.log(article);
      document.getElementById("posts").appendChild(article);
    }
  }));
}
function brightness(col, amt) {
  col = col.slice(1);
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if(r > 255) r = 255;
  else if(r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if(b > 255) b = 255;
  else if(b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if(g > 255) g = 255;
  else if(g < 0) g = 0;
  return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
}