import fetch from "./modules/post/fetch.js";
import {showTerms, hideTerms} from "./modules/other/terms.js";
import quotes from "./modules/other/quotes.js";
import login from "./modules/user/login.js";
import logout from "./modules/user/logout.js";

export function main() {
  sessionStorage.removeItem("userData");
  if(window.location.search !== "") {
    const params = new URLSearchParams(window.location.search);
    if(params.get("logout")) {
      //TODO: show logout notif
    }else if(params.get("loginfailure")) {
      //TODO: show failure notif
    }
  }
  showTerms();
  hideTerms();
  quotes();
  login();
  loadMorePosts();
}

export function loadMorePosts() {
  document.getElementById("loadPosts").setAttribute("data-currentPost", fetch(parseInt(document.getElementById("loadPosts").getAttribute("data-currentPost"))).toString());
}