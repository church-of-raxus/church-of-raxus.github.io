import ads from "./modules/other/ads.js";

export default async function() {
  let id = 0;
  await fetch("./propaganda/news.json").then((response) => response.json().then(data => {
    for(const post of data.posts) {
      let uuid = id++;
      //gen post img color
      let color = post.color;
      color = color.substring(0, color.length - 2);
      color += "0.8)";
      //gen post container
      const article = document.createElement("div");
      article.setAttribute("class", "card text-center animate__animated animate__bounceIn");
      article.setAttribute("style", `background-color: ${color};`);
      //gen post text
      const title = document.createElement("p");
      title.setAttribute("class", "card-header");
      title.setAttribute("style", `background-color: ${post.color}; font-size: 20px; color: white;`);
      const titleContent = document.createTextNode(post.header);
      const author = document.createElement("div");
      author.setAttribute("class", "author-text");
      author.innerText = post.author;
      //gen post image
      const img = document.createElement("img");
      img.setAttribute("src", `data:image/png;base64,${post.image.base64}`);
      img.setAttribute("alt", `${post.author}'s post image`);
      img.setAttribute("class", "card-img-top m-auto pt-2 pb-2");
      img.setAttribute("style", "max-height: 500px; max-width: 85%;");
      //build post
      title.appendChild(titleContent);
      title.appendChild(author);
      article.appendChild(title);
      article.appendChild(img);
      //gen optional post body
      if("body" in post) {
        //gen body container
        const body = document.createElement("div");
        body.setAttribute("class", "card-body");
        body.setAttribute("style", `background-color: ${post.color};`);
        if(post.body.title !== "" || post.body.description !== "") {
          //gen body button
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
          //gen body
          const collapse = document.createElement("div");
          collapse.setAttribute("id", uuid.toString());
          collapse.setAttribute("class", "collapse");
          const description = document.createElement("div");
          description.setAttribute("class", "card card-body text-white");
          description.setAttribute("style", `background-color: ${color}; font-size: 20px;`);
          const descriptionContent = document.createTextNode(post.body.description);
          //build post body
          description.appendChild(descriptionContent);
          collapse.appendChild(description);
          button.appendChild(buttonContent);
          dropdown.appendChild(button);
          dropdown.appendChild(collapse);
          body.appendChild(dropdown);
        }
        //add body to post
        article.appendChild(body);
      }
      //add post to news
      document.getElementById("posts").appendChild(article);
    }
  }));
  ads();
}