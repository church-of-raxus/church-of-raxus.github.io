async function news() {

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
      //console.log(article);
      document.getElementById("posts").appendChild(article);
    }
  }));

}

const rgb_shade=(p,c)=>
{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgba"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:", 0.7)");
}